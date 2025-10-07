const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RoleIdentifierModule", (m) => {
    const ri = m.contract("RoleIdentifier");
    return { ri };
});
