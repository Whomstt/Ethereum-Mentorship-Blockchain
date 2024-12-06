const Mentorship = artifacts.require("Mentorship");
const InterviewQuestions = artifacts.require("InterviewQuestions");

module.exports = async function (deployer) {
  // Deploy the Mentorship contract
  await deployer.deploy(Mentorship);
  
  // Deploy the InterviewQuestions contract
  await deployer.deploy(InterviewQuestions);
};