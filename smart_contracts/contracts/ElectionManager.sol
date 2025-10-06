// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IShareholderRegistry {
    function getVotingPower(address wallet) external view returns (uint256);
}

interface IDocumentRegistry {
    function registerDocument(bytes32 docHash, string calldata uri) external;
}

/// @title Election Manager (simple weighted-vote election)
/// @notice Owner creates elections; shareholders vote once per election with weight = shares.
/// @dev Votes are not encrypted on-chain here; store sensitive encrypted ballots off-chain and only
///      record final tallies or proofs on-chain if you need privacy in real deployment.
contract ElectionManager {
    address public owner;
    IShareholderRegistry public registry;
    IDocumentRegistry public docRegistry;

    uint256 public electionCount;

    struct Candidate {
        uint256 id;
        string name;
        string docURI; // manifesto location (IPFS)
    }

    struct Election {
        uint256 id;
        string title;
        uint256 startTime;
        uint256 endTime;
        bool ended;
        uint256 candidateCount;
        mapping(uint256 => Candidate) candidates;
        mapping(uint256 => uint256) votes; // candidateId => total weighted votes
        mapping(address => bool) hasVoted; // prevents multiple votes
    }

    // electionId => Election
    mapping(uint256 => Election) private elections;

    event ElectionCreated(uint256 indexed electionId, string title, uint256 startTime, uint256 endTime);
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

    /// @notice Create an election with candidate names and docURIs (arrays must match)
    function createElection(
        string calldata title,
        string[] calldata candidateNames,
        string[] calldata candidateDocURIs,
        uint256 startTime,
        uint256 endTime
    ) external onlyOwner returns (uint256) {
        require(candidateNames.length > 0, "need candidates");
        require(candidateNames.length == candidateDocURIs.length, "length mismatch");
        require(startTime < endTime, "invalid times");

        electionCount += 1;
        uint256 eid = electionCount;

        Election storage e = elections[eid];
        e.id = eid;
        e.title = title;
        e.startTime = startTime;
        e.endTime = endTime;
        e.ended = false;
        e.candidateCount = 0;

        for (uint256 i = 0; i < candidateNames.length; i++) {
            uint256 cid = i + 1; // candidate IDs start at 1
            e.candidates[cid] = Candidate({id: cid, name: candidateNames[i], docURI: candidateDocURIs[i]});
            e.candidateCount += 1;
        }

        emit ElectionCreated(eid, title, startTime, endTime);
        return eid;
    }

    /// @notice Cast a vote for a candidate in an election. Voter's weight is registry.getVotingPower(msg.sender).
    /// @dev A voter can only vote once per election (full weight to one candidate). For split voting you'd need a more complex interface.
    function castVote(uint256 electionId, uint256 candidateId) external {
        Election storage e = elections[electionId];
        require(e.id != 0, "no election");
        require(block.timestamp >= e.startTime && block.timestamp <= e.endTime, "not in voting window");
        require(!e.hasVoted[msg.sender], "already voted");
        require(candidateId >= 1 && candidateId <= e.candidateCount, "invalid candidate");

        uint256 weight = registry.getVotingPower(msg.sender);
        require(weight > 0, "no voting power");

        e.votes[candidateId] += weight;
        e.hasVoted[msg.sender] = true;

        emit VoteCast(electionId, candidateId, msg.sender, weight);
    }

    /// @notice Owner ends an election early (or after endTime) and can register final results doc to DocumentRegistry
    function endElection(uint256 electionId, bytes32 resultsDocHash, string calldata resultsURI) external onlyOwner {
        Election storage e = elections[electionId];
        require(e.id != 0, "no election");
        require(!e.ended, "already ended");
        require(block.timestamp > e.endTime || block.timestamp >= e.endTime, "election not ended yet (owner may still end after endTime)");

        e.ended = true;

        // register results doc on DocumentRegistry (optional)
        if (resultsDocHash != bytes32(0)) {
            // requires that ElectionManager has permissions on DocumentRegistry in deployments where registerDocument isn't owner-only,
            // or DocumentRegistry is implemented to allow this contract to register.
            // If DocumentRegistry is owner-only, deployer must coordinate ownership or modify that contract.
            docRegistry.registerDocument(resultsDocHash, resultsURI);
        }

        emit ElectionEnded(electionId);
    }

    /// @notice Get candidate count for an election
    function getCandidateCount(uint256 electionId) external view returns (uint256) {
        Election storage e = elections[electionId];
        return e.candidateCount;
    }

    /// @notice Get candidate info (id, name, docURI)
    function getCandidate(uint256 electionId, uint256 candidateId) external view returns (uint256 id, string memory name, string memory docURI, uint256 votesFor) {
        Election storage e = elections[electionId];
        require(candidateId >= 1 && candidateId <= e.candidateCount, "invalid candidate");
        Candidate storage c = e.candidates[candidateId];
        uint256 v = e.votes[candidateId];
        return (c.id, c.name, c.docURI, v);
    }

    /// @notice Check if an address has voted in an election
    function hasVoted(uint256 electionId, address voter) external view returns (bool) {
        Election storage e = elections[electionId];
        return e.hasVoted[voter];
    }

    /// @notice Utility: get basic election metadata
    function getElectionMeta(uint256 electionId) external view returns (string memory title, uint256 startTime, uint256 endTime, bool ended, uint256 candidateCount) {
        Election storage e = elections[electionId];
        return (e.title, e.startTime, e.endTime, e.ended, e.candidateCount);
    }
}
