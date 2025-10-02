const {buildModule} = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("HelloWorldModule", (m) => {
    const hello = m.contract("HelloWorld");
    return { hello };
});