const Mentorship = artifacts.require("Mentorship");

module.exports = async function (deployer) {
  // Deploy the SimpleStorage contract
  await deployer.deploy(Mentorship);
};