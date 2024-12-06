const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');

// Set up Web3 connection to the local Ganache instance (adjust port if needed)
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545')); // Ganache default port

// Load the InterviewQuestions contract ABI and address (from Truffle build artifacts)
const contractPath = path.join(__dirname, '../build/contracts/InterviewQuestions.json');
const contractJSON = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

// Load the contract address from an environment variable, config file, or command-line argument
const contractAddress = process.env.CONTRACT_ADDRESS || '0x340caebDF371bb8f9F95932360e2f5cDaC5B2Cd3'; // Use default if not set

// Initialize the InterviewQuestions contract
const interviewQuestionsContract = new web3.eth.Contract(contractJSON.abi, contractAddress);

// Fetch interviewQuestions data from the off-chain JSON file
const interviewQuestionsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../offchain-data/interview_questions_data.json'), 'utf8'));

// Function to get interviewQuestions data for a given departmentId
async function getInterviewQuestionsData(departmentId) {
  try {
    // Fetch interviewQuestions data from the off-chain JSON file using departmentId
    const data = interviewQuestionsData[departmentId];
    if (data) {
      console.log(`Interview Questions Data for Department ${departmentId}:`);
      console.log(`Question: ${data.questionName}`);
      data.answers.forEach((answer, index) => {
        console.log(`Answer ${index + 1}: ${answer}`);
      });
      console.log('---');
    } else {
      console.log(`No interview questions data found for department ID: ${departmentId}`);
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
        const { departmentId, requester } = event.returnValues;
        console.log(`Interview questions fetch requested by ${requester} for Department ID: ${departmentId}`);
        
        // Now fetch the interview questions data based on the departmentId
        await getInterviewQuestionsData(departmentId);
      })
      .on('error', (error) => {
        console.error('Error in event listener:', error);
      });
    
    console.log('Listening for InterviewQuestionsFetchRequested events...');
  } catch (error) {
    console.error('Event listener setup failed:', error);
  }
}

// Check if the script is passed a departmentId as a command-line argument
const departmentIdArg = process.argv[2]; // The 3rd argument passed from the command line

if (departmentIdArg) {
  // Fetch interview questions data for the given departmentId
  console.log(`Fetching interview questions data for department ID: ${departmentIdArg}`);
  getInterviewQuestionsData(departmentIdArg);
} else {
  // No departmentId provided, start listening for events
  listenForInterviewQuestionsRequests();
}
