// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Document Registry (hash + URI registry)
/// @notice Store immutable references to documents (hash + ipfs/arweave URI)
contract DocumentRegistry {
    address public owner;

    struct Doc {
        address uploader;
        uint256 timestamp;
        string uri;
        bool exists;
    }

    // maps keccak256(docHash) -> Doc
    mapping(bytes32 => Doc) private docs;

    event DocumentRegistered(bytes32 indexed docHash, string uri, address indexed uploader, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice Register a document (owner-only to simplify)
    /// @param docHash keccak256 of the underlying file contents (client should hash)
    /// @param uri IPFS/Arweave/or other persistent URI pointing to the file
    function registerDocument(bytes32 docHash, string calldata uri) external onlyOwner {
        require(docHash != bytes32(0), "invalid hash");
        require(!docs[docHash].exists, "already registered");
        docs[docHash] = Doc({uploader: msg.sender, timestamp: block.timestamp, uri: uri, exists: true});
        emit DocumentRegistered(docHash, uri, msg.sender, block.timestamp);
    }

    /// @notice Verify whether a docHash is registered and get its URI
    function verifyDocument(bytes32 docHash) external view returns (bool registered, string memory uri, address uploader, uint256 timestamp) {
        Doc memory d = docs[docHash];
        return (d.exists, d.uri, d.uploader, d.timestamp);
    }
}
