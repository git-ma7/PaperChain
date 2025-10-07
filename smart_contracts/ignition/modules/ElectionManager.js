const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ElectionManagerModule", (m) => {
    // Replace these with actual deployed contract addresses
    const shareholderRegistryAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const documentRegistryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const electionManager = m.contract("ElectionManager", [
        shareholderRegistryAddress,
        documentRegistryAddress
    ]);

    return { electionManager };
});
