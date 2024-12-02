const StudentRequestSystem = artifacts.require("StudentRequestSystem");

module.exports = async function (deployer) {
  // Deploy the SimpleStorage contract
  await deployer.deploy(StudentRequestSystem);
};