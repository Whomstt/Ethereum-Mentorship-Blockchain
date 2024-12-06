const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');

// Set up Web3 connection to the local Ganache instance (adjust port if needed)
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545')); // Ganache default port

// Load the Mentorship contract ABI and address (from Truffle build artifacts)
const contractPath = path.join(__dirname, '../build/contracts/Mentorship.json');
const contractJSON = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const contractAddress = '0x340caebDF371bb8f9F95932360e2f5cDaC5B2Cd3'; // Replace with your contract's deployed address

const mentorshipContract = new web3.eth.Contract(contractJSON.abi, contractAddress);

// Fetch mentorship data from the off-chain JSON file
const mentorshipData = JSON.parse(fs.readFileSync(path.join(__dirname, '../offchain-data/mentorship_data.json'), 'utf8'));

// Function to get mentorship data for a given departmentId
async function getMentorshipData(departmentId) {
  try {
    // Fetch mentorship data from the off-chain JSON file using departmentId
    const data = mentorshipData[departmentId];
    if (data) {
      console.log(`Mentorship Data for Department ${departmentId}:`);
      console.log(`Department Name: ${data.departmentName}`);
      data.mentors.forEach(mentor => {
        console.log(`Mentor Name: ${mentor.name}`);
        console.log(`Email: ${mentor.email}`);
        console.log(`Expertise: ${mentor.expertise}`);
        console.log('---');
      });
    } else {
      console.log(`No mentorship data found for department ID: ${departmentId}`);
    }
  } catch (error) {
    console.error('Error fetching mentorship data:', error);
  }
}

// Function to listen to events emitted by the contract
async function listenForMentorshipRequests() {
  try {
    mentorshipContract.events.MentorshipFetchRequested({ fromBlock: 'latest' })
      .on('data', async (event) => {
        const { departmentId, requester } = event.returnValues;
        console.log(`Mentorship fetch requested by ${requester} for Department ID: ${departmentId}`);
        
        // Now fetch the mentorship data based on the departmentId
        await getMentorshipData(departmentId);
      })
      .on('error', (error) => {
        console.error('Error in event listener:', error);
      });
    
    console.log('Listening for MentorshipFetchRequested events...');
  } catch (error) {
    console.error('Event listener setup failed:', error);
  }
}

// Start listening for events
listenForMentorshipRequests();
