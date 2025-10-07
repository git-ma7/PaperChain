const {buildModule} = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ShareholderRegistryModule", (m) => {
    const SR = m.contract("ShareholderRegistry");
    return { SR };
});