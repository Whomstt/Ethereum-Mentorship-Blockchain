const Migrations = artifacts.require("Migrations");

module.exports = async function (deployer, network, accounts) {
  // Use the first account from Ganache (accounts[0])
  await deployer.deploy(Migrations, { from: accounts[0] });
};
