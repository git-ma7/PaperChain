const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MergerAndAcquisitionElectionModule", (m) => {
  const mergerElection = m.contract("MergerAndAcquisitionElection");

  return { mergerElection };
});
