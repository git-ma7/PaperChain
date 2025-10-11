const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FullDeploymentModule", (m) => {
    const roleIdentifier = m.contract("RoleIdentifier");
    const shareholderRegistry = m.contract("ShareholderRegistry");
    const documentRegistry = m.contract("DocumentRegistry");

    const electionManager = m.contract("ElectionManager", [
        shareholderRegistry,
        documentRegistry
    ]);

    return {
        roleIdentifier,
        shareholderRegistry,
        documentRegistry,
        electionManager
    };
});
