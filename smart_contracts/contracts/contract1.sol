// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Use OpenZeppelin's implementations in your project
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";

interface IERC20Snapshot {
    function snapshot() external returns (uint256);
    function balanceOfAt(address account, uint256 snapshotId) external view returns (uint256);
}

contract ElectionUsingSnapshot is Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;
    enum Status { Created, NominationsClosed, VotingOpen, VotingClosed, Finalized }

    struct Candidate {
        uint256 id;
        string name;
        string bioCid; // IPFS CID or URL for long bio / proxy statement
        address nominatedBy;
        bool active;
    }

    IERC20Snapshot public shareToken;
    uint256 public recordSnapshotId; // snapshot taken at record date
    uint256 public electionId; // increment for multiple elections
    Status public status;

    mapping(uint256 => Candidate) public candidates;
    uint256[] public candidateIds;
    uint256 public nextCandidateId;

    // votes per candidate per election
    mapping(uint256 => uint256) public votes; // candidateId => total weighted votes
    mapping(address => bool) public hasVoted; // prevents double voting per election

    event CandidateNominated(uint256 indexed candidateId, string name, address indexed nominatedBy);
    event RecordSnapshotTaken(uint256 indexed snapshotId);
    event VotingOpened();
    event VotingClosed();
    event VoteCast(address indexed voter, uint256 indexed candidateId, uint256 weight);
    event Finalized(uint256 indexed winnerId, uint256 votes);

    constructor(address _shareToken) {
        require(_shareToken != address(0), "token required");
        shareToken = IERC20Snapshot(_shareToken);
        status = Status.Created;
    }

    // Nomination: owner or nominated committee should call
    function nominateCandidate(string calldata name, string calldata bioCid) external onlyOwner {
        require(status == Status.Created, "nominations closed");
        uint256 cid = ++nextCandidateId;
        candidates[cid] = Candidate(cid, name, bioCid, msg.sender, true);
        candidateIds.push(cid);
        emit CandidateNominated(cid, name, msg.sender);
    }

    // Close nominations, move to record date stage
    function closeNominations() external onlyOwner {
        require(status == Status.Created, "invalid state");
        status = Status.NominationsClosed;
    }

    // Take snapshot on share token to lock voting weights at record date
    function takeRecordSnapshot() external onlyOwner returns (uint256) {
        require(status == Status.NominationsClosed, "nominations not closed");
        uint256 sid = shareToken.snapshot();
        recordSnapshotId = sid;
        status = Status.VotingOpen;
        emit RecordSnapshotTaken(sid);
        emit VotingOpened();
        return sid;
    }

    // Vote for a candidate (weighted by share balance at snapshot)
    function vote(uint256 candidateId) external {
        require(status == Status.VotingOpen, "voting not open");
        require(!hasVoted[msg.sender], "already voted");
        require(candidateId > 0 && candidateId <= nextCandidateId && candidates[candidateId].active, "invalid candidate");

        uint256 weight = shareToken.balanceOfAt(msg.sender, recordSnapshotId);
        require(weight > 0, "no voting power at record date");

        votes[candidateId] += weight;
        hasVoted[msg.sender] = true;

        emit VoteCast(msg.sender, candidateId, weight);
    }

    // Close voting (owner)
    function closeVoting() external onlyOwner {
        require(status == Status.VotingOpen, "voting not open");
        status = Status.VotingClosed;
        emit VotingClosed();
    }

    // Finalize and declare winner
    function finalize() external onlyOwner {
        require(status == Status.VotingClosed, "voting not closed");
        uint256 winner;
        uint256 topVotes;
        for (uint256 i = 0; i < candidateIds.length; i++) {
            uint256 cid = candidateIds[i];
            if (votes[cid] > topVotes) {
                topVotes = votes[cid];
                winner = cid;
            }
        }
        status = Status.Finalized;
        emit Finalized(winner, topVotes);
    }

    // Helper views
    function getCandidates() external view returns (Candidate[] memory) {
        Candidate[] memory list = new Candidate[](candidateIds.length);
        for (uint256 i = 0; i < candidateIds.length; i++) {
            list[i] = candidates[candidateIds[i]];
        }
        return list;
    }

    function getVotes(uint256 candidateId) external view returns (uint256) {
        return votes[candidateId];
    }
}