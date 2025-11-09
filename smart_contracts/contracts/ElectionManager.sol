// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

interface IShareholderRegistry {
    function getVotingPower(address wallet) external view returns (uint256);
}

interface IDocumentRegistry {
    function registerDocument(bytes32 docHash, string calldata uri) external;
}

/// @title Election Manager (weighted voting by shareholders)
/// @notice Owner creates elections, starts/ends them, and each shareholder can vote once with weight = shares.
contract ElectionManager {
    address public owner;
    IShareholderRegistry public registry;
    IDocumentRegistry public docRegistry;

    uint256 public electionCount;
    uint256 public globalCandidateCount;

    enum ElectionStatus { NotStarted, Ongoing, Ended }

    struct Candidate {
        uint256 id;
        string name;
        address wallet;
        string docURI; // optional (e.g., IPFS URI for manifesto or profile)
    }

    struct Election {
        uint256 id;
        uint256 startTime;
        uint256 endTime;
        bool ended;
        uint256 candidateCount;
        mapping(uint256 => Candidate) candidates;
        mapping(uint256 => uint256) votes; // candidateId => total weighted votes
        mapping(address => bool) hasVoted;
        ElectionStatus status;
    }

    mapping(uint256 => Election) private elections;
    mapping(address => Candidate) public allCandidates;

    event CandidateRegistered(address indexed wallet, string name, uint256 indexed candidateId);
    event BulkCandidatesRegistered(uint256 count);
    event ElectionCreated(uint256 indexed electionId, uint256 startTime, uint256 endTime);
    event ElectionStarted(uint256 indexed electionId, uint256 startTimestamp);
    event VoteCast(uint256 indexed electionId, uint256 indexed candidateId, address indexed voter, uint256 weight);
    event ElectionEnded(uint256 indexed electionId);

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    constructor(address shareholderRegistryAddress, address documentRegistryAddress) {
        owner = msg.sender;
        registry = IShareholderRegistry(shareholderRegistryAddress);
        docRegistry = IDocumentRegistry(documentRegistryAddress);
    }

    // ---------------------------------------------------------------------
    // 🧩 CANDIDATE REGISTRATION
    // ---------------------------------------------------------------------

    function bulkRegisterCandidates(
        string[] calldata names,
        address[] calldata wallets
    ) external onlyOwner {
        require(names.length == wallets.length, "array length mismatch");

        for (uint256 i = 0; i < wallets.length; i++) {
            address w = wallets[i];
            require(w != address(0), "zero address");
            require(bytes(names[i]).length > 0, "empty name");
            require(allCandidates[w].wallet == address(0), "already registered");

            globalCandidateCount++;
            allCandidates[w] = Candidate({
                id: globalCandidateCount,
                name: names[i],
                wallet: w,
                docURI: ""
            });

            emit CandidateRegistered(w, names[i], globalCandidateCount);
        }

        emit BulkCandidatesRegistered(wallets.length);
    }

    function getRegisteredCandidate(address wallet)
        external
        view
        returns (string memory name, uint256 id, address walletAddr, string memory docURI)
    {
        Candidate memory c = allCandidates[wallet];
        return (c.name, c.id, c.wallet, c.docURI);
    }

    // ---------------------------------------------------------------------
    // 🧩 ELECTION CREATION
    // ---------------------------------------------------------------------

    function createElectionFromRegisteredCandidates(
        address[] calldata candidateWallets,
        uint256 startTime,
        uint256 endTime
    ) external onlyOwner returns (uint256) {
        require(candidateWallets.length > 0, "need candidates");
        require(startTime < endTime, "invalid times");

        electionCount++;
        uint256 eid = electionCount;
        Election storage e = elections[eid];
        e.id = eid;
        e.startTime = startTime;
        e.endTime = endTime;
        e.status = ElectionStatus.NotStarted;

        for (uint256 i = 0; i < candidateWallets.length; i++) {
            address cw = candidateWallets[i];
            Candidate memory c = allCandidates[cw];
            require(c.wallet != address(0), "candidate not registered");

            uint256 cid = i + 1;
            e.candidates[cid] = c;
            e.candidateCount++;
        }

        emit ElectionCreated(eid, startTime, endTime);
        return eid;
    }

    function createElection(
        string[] calldata candidateNames,
        string[] calldata candidateDocURIs,
        uint256 startTime,
        uint256 endTime
    ) external onlyOwner returns (uint256) {
        require(candidateNames.length > 0, "need candidates");
        require(candidateNames.length == candidateDocURIs.length, "length mismatch");
        require(startTime < endTime, "invalid times");

        electionCount++;
        uint256 eid = electionCount;

        Election storage e = elections[eid];
        e.id = eid;
        e.startTime = startTime;
        e.endTime = endTime;
        e.ended = false;
        e.status = ElectionStatus.NotStarted;

        for (uint256 i = 0; i < candidateNames.length; i++) {
            uint256 cid = i + 1;
            e.candidates[cid] = Candidate({
                id: cid,
                name: candidateNames[i],
                wallet: address(0),
                docURI: candidateDocURIs[i]
            });
            e.candidateCount++;
        }

        emit ElectionCreated(eid, startTime, endTime);
        return eid;
    }

    // ---------------------------------------------------------------------
    // 🧩 ELECTION FLOW
    // ---------------------------------------------------------------------

    function startElection(uint256 electionId) external onlyOwner {
        console.log("Starting election:",electionId);
        Election storage e = elections[electionId];
        require(e.id != 0, "no election");
        require(e.status == ElectionStatus.NotStarted, "already started or ended");
        e.status = ElectionStatus.Ongoing;
        emit ElectionStarted(electionId, block.timestamp);
    }

    function castVote(uint256 electionId, uint256 candidateId) external {
        Election storage e = elections[electionId];
        require(e.id != 0, "no election");
        require(e.status == ElectionStatus.Ongoing, "election not active");
        require(block.timestamp >= e.startTime && block.timestamp <= e.endTime, "not in voting window");
        require(!e.hasVoted[msg.sender], "already voted");
        require(candidateId >= 1 && candidateId <= e.candidateCount, "invalid candidate");

        uint256 weight = registry.getVotingPower(msg.sender);
        require(weight > 0, "no voting power");

        e.votes[candidateId] += weight;
        e.hasVoted[msg.sender] = true;

        emit VoteCast(electionId, candidateId, msg.sender, weight);
    }

    function endElection(uint256 electionId) external onlyOwner {
        Election storage e = elections[electionId];
        console.log("Ending election:",electionId);
        require(e.id != 0, "no election");
        require(e.status == ElectionStatus.Ongoing, "election not active");

        e.status = ElectionStatus.Ended;
        e.ended = true;

        emit ElectionEnded(electionId);
    }

    // ---------------------------------------------------------------------
    // 🧩 VIEW FUNCTIONS
    // ---------------------------------------------------------------------

    function getCandidateCount(uint256 electionId) external view returns (uint256) {
        return elections[electionId].candidateCount;
    }

    function getCandidate(
        uint256 electionId,
        uint256 candidateId
    )
        external
        view
        returns (uint256 id, string memory name, address wallet, string memory docURI, uint256 votesFor)
    {
        Election storage e = elections[electionId];
        require(candidateId >= 1 && candidateId <= e.candidateCount, "invalid candidate");
        Candidate storage c = e.candidates[candidateId];
        uint256 v = e.votes[candidateId];
        return (c.id, c.name, c.wallet, c.docURI, v);
    }

    function hasVoted(uint256 electionId, address voter) external view returns (bool) {
        return elections[electionId].hasVoted[voter];
    }

    function getElectionMeta(
        uint256 electionId
    )
        external
        view
        returns (uint256 startTime, uint256 endTime, bool ended, uint256 candidateCount)
    {
        Election storage e = elections[electionId];
        return (e.startTime, e.endTime, e.ended, e.candidateCount);
    }

    function getElectionStatus(uint256 electionId) external view returns (ElectionStatus) {
        return elections[electionId].status;
    }

    // ---------------------------------------------------------------------
    // 🏆 WINNER FUNCTION
    // ---------------------------------------------------------------------

    function getWinner(uint256 electionId)
        external
        view
        returns (string memory winnerName, uint256 winningVotes)
    {
        Election storage e = elections[electionId];
        require(e.id != 0, "no election");
        require(e.status == ElectionStatus.Ended, "election not ended");
        require(e.candidateCount > 0, "no candidates");

        uint256 highestVotes = 0;
        uint256 winnerCandidateId = 0;

        for (uint256 i = 1; i <= e.candidateCount; i++) {
            uint256 candidateVotes = e.votes[i];
            if (candidateVotes > highestVotes) {
                highestVotes = candidateVotes;
                winnerCandidateId = i;
            }
        }

        Candidate storage winner = e.candidates[winnerCandidateId];
        return (winner.name, highestVotes);
    }
}
