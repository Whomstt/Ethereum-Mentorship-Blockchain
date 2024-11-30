const StudentRequestSystem = artifacts.require("StudentRequestSystem");

module.exports = async function (deployer, network, accounts) {
  const account = accounts[0]; // You can use the first account or the one you specified in truffle-config.js
  const password = "Valid1234$"; // If you use --allow-insecure-unlock with Geth, no password is needed, so leave it empty

  // Unlock the account if it's locked
  await web3.eth.personal.unlockAccount(account, password, 600); // Unlock for 10 minutes

  // Deploy the contract
  await deployer.deploy(StudentRequestSystem);
};
