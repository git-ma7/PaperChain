// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RoleIdentifier {
    address public admin;
    mapping(address => bool) public isShareholder;

    constructor() {
        admin = msg.sender;
    }

    /// @notice Add a shareholder (only admin)
    function addShareholder(address wallet) external {
        require(msg.sender == admin, "only admin");
        require(wallet != address(0), "zero address");
        isShareholder[wallet] = true;
    }

    /// @notice Identify role of an address
    function identify(address wallet) external view returns (string memory) {
        if (wallet == admin) {
            return "Admin";
        } else if (isShareholder[wallet]) {
            return "Shareholder";
        } else {
            return "Unknown";
        }
    }
}
