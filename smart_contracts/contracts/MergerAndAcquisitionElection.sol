// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Merger & Acquisition Election
/// @notice Simple binary election (For / Against) with 75% approval threshold
/// @dev Owner controls election flow and manages voter list
contract MergerAndAcquisitionElection {
    address public owner;

    struct Election {
        uint256 id;
        bool started;
        bool ended;
        uint256 totalVoters;
        uint256 votesFor;
        uint256 votesAgainst;
        mapping(address => bool) isVoter;
        mapping(address => bool) hasVoted;
        mapping(address => bool) voteChoice; // true = For, false = Against
    }

    uint256 public electionCount;
    mapping(uint256 => Election) private elections;

    event ElectionCreated(uint256 indexed electionId);
    event VotersAdded(uint256 indexed electionId, uint256 count);
    event ElectionStarted(uint256 indexed electionId);
    event VoteCast(uint256 indexed electionId, address indexed voter, bool inFavor);
    event ElectionEnded(uint256 indexed electionId, bool approved, uint256 votesFor, uint256 votesAgainst);

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // ---------------------------------------------------------------------
    // 🧩 ELECTION MANAGEMENT
    // ---------------------------------------------------------------------

    /// @notice Create a new Merger/Acquisition election
    function createElection() external onlyOwner returns (uint256) {
        electionCount++;
        elections[electionCount].id = electionCount;
        emit ElectionCreated(electionCount);
        return electionCount;
    }

    /// @notice Bulk add eligible voters for an election
    function addVoters(uint256 electionId, address[] calldata voterWallets) external onlyOwner {
        Election storage e = elections[electionId];
        require(e.id != 0, "no such election");
        require(!e.started, "cannot add voters after start");

        for (uint256 i = 0; i < voterWallets.length; i++) {
            address w = voterWallets[i];
            require(w != address(0), "zero address");
            require(!e.isVoter[w], "already added");
            e.isVoter[w] = true;
            e.totalVoters++;
        }

        emit VotersAdded(electionId, voterWallets.length);
    }

    /// @notice Start the election
    function startElection(uint256 electionId) external onlyOwner {
        Election storage e = elections[electionId];
        require(e.id != 0, "no such election");
        require(!e.started, "already started");
        require(!e.ended, "already ended");
        require(e.totalVoters > 0, "no voters added");

        e.started = true;
        emit ElectionStarted(electionId);
    }

    /// @notice End the election and declare result
    function endElection(uint256 electionId) external onlyOwner {
        Election storage e = elections[electionId];
        require(e.started, "not started");
        require(!e.ended, "already ended");

        e.ended = true;
        bool approved = false;

        if (e.totalVoters > 0) {
            uint256 percentFor = (e.votesFor * 100) / e.totalVoters;
            if (percentFor >= 75) {
                approved = true;
            }
        }

        emit ElectionEnded(electionId, approved, e.votesFor, e.votesAgainst);
    }

    // ---------------------------------------------------------------------
    // 🗳️ VOTING
    // ---------------------------------------------------------------------

    /// @notice Cast a vote (true = For, false = Against)
    function vote(uint256 electionId, bool inFavor) external {
        Election storage e = elections[electionId];
        require(e.started, "not started");
        require(!e.ended, "already ended");
        require(e.isVoter[msg.sender], "not eligible");
        require(!e.hasVoted[msg.sender], "already voted");

        e.hasVoted[msg.sender] = true;
        e.voteChoice[msg.sender] = inFavor;

        if (inFavor) {
            e.votesFor++;
        } else {
            e.votesAgainst++;
        }

        emit VoteCast(electionId, msg.sender, inFavor);
    }

    // ---------------------------------------------------------------------
    // 🔍 VIEW FUNCTIONS
    // ---------------------------------------------------------------------

    /// @notice Returns only the percentage of people in favor and approval status
    function getElectionResult(uint256 electionId)
        external
        view
        returns (uint256 percentageInFavor, bool approved)
    {
        Election storage e = elections[electionId];
        require(e.id != 0, "no such election");

        if (e.totalVoters == 0) {
            return (0, false);
        }

        percentageInFavor = (e.votesFor * 100) / e.totalVoters;
        approved = (percentageInFavor >= 75);
    }
}