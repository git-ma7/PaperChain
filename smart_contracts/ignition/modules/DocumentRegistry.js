const {buildModule} = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DocumentRegistryModule", (m) => {
    const DR = m.contract("DocumentRegistry");
    return { DR };
});