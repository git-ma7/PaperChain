// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Shareholder Registry (extended with names and bulk upload)
/// @notice Owner-managed mapping of wallet -> shareholder info (name + shares)
contract ShareholderRegistry {
    address public owner;

    struct Shareholder {
        string name;
        uint256 shares;
        bool exists;
    }

    mapping(address => Shareholder) private shareholders;

    event ShareholderAdded(address indexed wallet, string name, uint256 shares);
    event ShareholderUpdated(address indexed wallet, string name, uint256 shares);
    event ShareholderRemoved(address indexed wallet);
    event BulkShareholdersAdded(uint256 count);

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice Add or overwrite a single shareholder
    function addShareholder(address wallet, string calldata name, uint256 _shares) external onlyOwner {
        require(wallet != address(0), "zero address");
        shareholders[wallet] = Shareholder({name: name, shares: _shares, exists: true});
        emit ShareholderAdded(wallet, name, _shares);
    }

    /// @notice Update shareholder details
    function updateShareholder(address wallet, string calldata name, uint256 _shares) external onlyOwner {
        require(wallet != address(0), "zero address");
        require(shareholders[wallet].exists, "shareholder not found");
        shareholders[wallet].name = name;
        shareholders[wallet].shares = _shares;
        emit ShareholderUpdated(wallet, name, _shares);
    }

    /// @notice Remove a shareholder (sets to default)
    function removeShareholder(address wallet) external onlyOwner {
        require(wallet != address(0), "zero address");
        delete shareholders[wallet];
        emit ShareholderRemoved(wallet);
    }

    /// @notice Bulk upload shareholders (for Excel import)
    /// @dev Arrays must match in length: names[i], wallets[i], shares[i]
    function addShareholdersBulk(
        string[] calldata names,
        address[] calldata wallets,
        uint256[] calldata sharesList
    ) external onlyOwner {
        require(
            names.length == wallets.length && wallets.length == sharesList.length,
            "array length mismatch"
        );

        for (uint256 i = 0; i < wallets.length; i++) {
            address wallet = wallets[i];
            require(wallet != address(0), "zero address");
            shareholders[wallet] = Shareholder({name: names[i], shares: sharesList[i], exists: true});
            emit ShareholderAdded(wallet, names[i], sharesList[i]);
        }

        emit BulkShareholdersAdded(wallets.length);
    }

    /// @notice Get voting power (number of shares)
    function getVotingPower(address wallet) external view returns (uint256) {
        return shareholders[wallet].shares;
    }

    /// @notice Get full shareholder details
    function getShareholder(address wallet) external view returns (string memory name, uint256 shares, bool exists) {
        Shareholder memory s = shareholders[wallet];
        return (s.name, s.shares, s.exists);
    }
}
