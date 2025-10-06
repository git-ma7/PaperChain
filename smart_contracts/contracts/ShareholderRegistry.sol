// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Shareholder Registry (simple)
/// @notice Owner-managed mapping of wallet -> shares (voting power)
contract ShareholderRegistry {
    address public owner;

    mapping(address => uint256) private shares;
    event ShareholderAdded(address indexed wallet, uint256 sharesAdded);
    event ShareholderUpdated(address indexed wallet, uint256 newShares);
    event ShareholderRemoved(address indexed wallet);

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice Add shares for a shareholder (owner only). Overwrites if exists.
    function addShareholder(address wallet, uint256 _shares) external onlyOwner {
        require(wallet != address(0), "zero address");
        shares[wallet] = _shares;
        emit ShareholderAdded(wallet, _shares);
    }

    /// @notice Update shares for an existing shareholder (owner only).
    function updateShareholder(address wallet, uint256 _shares) external onlyOwner {
        require(wallet != address(0), "zero address");
        shares[wallet] = _shares;
        emit ShareholderUpdated(wallet, _shares);
    }

    /// @notice Remove shareholder (sets shares to 0)
    function removeShareholder(address wallet) external onlyOwner {
        require(wallet != address(0), "zero address");
        delete shares[wallet];
        emit ShareholderRemoved(wallet);
    }

    /// @notice Get voting power (shares) for wallet
    function getVotingPower(address wallet) external view returns (uint256) {
        return shares[wallet];
    }
}
