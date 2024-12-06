const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');

// Set up Web3 connection to the local Ganache instance
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

// Load the InterviewQuestions contract ABI and address from truffle build artifacts
const contractPath = path.join(__dirname, '../build/contracts/InterviewQuestions.json');
const contractJSON = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

// Load the contract address from the environment variables
const contractAddress = process.env.CONTRACT_ADDRESS;

// Initialize the InterviewQuestions contract
const interviewQuestionsContract = new web3.eth.Contract(contractJSON.abi, contractAddress);

// Fetch interviewQuestions data from the off-chain JSON file
const interviewQuestionsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../offchain-data/interview_questions_data.json'), 'utf8'));

// Function to get interviewQuestions data for a given questionId
async function getInterviewQuestionsData(questionId) {
  try {
    // Fetch interviewQuestions data from the off-chain JSON file using questionId
    const data = interviewQuestionsData[questionId];
    if (data) {
      console.log(`Interview Questions Data for Department ${questionId}:`);
      console.log(`Question: ${data.questionName}`);
      data.answers.forEach((answer, index) => {
        console.log(`Answer ${index + 1}: ${answer}`);
      });
      console.log('---');
    } else {
      console.log(`No interview questions data found for department ID: ${questionId}`);
    }
  } catch (error) {
    console.error('Error fetching interview questions data:', error);
  }
}

// Function to listen to events emitted by the contract
async function listenForInterviewQuestionsRequests() {
  try {
    interviewQuestionsContract.events.InterviewQuestionsFetchRequested({ fromBlock: 'latest' })
      .on('data', async (event) => {
        const { questionId, requester } = event.returnValues;
        console.log(`Interview questions fetch requested by ${requester} for Department ID: ${questionId}`);
        
        // Now fetch the interview questions data based on the questionId
        await getInterviewQuestionsData(questionId);
      })
      .on('error', (error) => {
        console.error('Error in event listener:', error);
      });
    
    console.log('Listening for InterviewQuestionsFetchRequested events...');
  } catch (error) {
    console.error('Event listener setup failed:', error);
  }
}

// Check if the script is passed a questionId as a command-line argument
const questionIdArg = process.argv[2]; // The 3rd argument passed from the command line

if (questionIdArg) {
  // Fetch interview questions data for the given questionId
  console.log(`Fetching interview questions data for department ID: ${questionIdArg}`);
  getInterviewQuestionsData(questionIdArg);
} else {
  // No questionId provided, start listening for events
  listenForInterviewQuestionsRequests();
}
