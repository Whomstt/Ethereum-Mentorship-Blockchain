import React, { useState } from "react";
import Web3 from "web3";
import axios from "axios"; // To fetch course data from backend

// Replace with your contract's ABI and address
const contractABI = [
  // Add your contract ABI here
];
const contractAddress = "0xYourContractAddress"; // Your deployed contract address

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [courseID, setCourseID] = useState(""); // To store the course ID entered by the student
  const [courseDetails, setCourseDetails] = useState(""); // To store course details fetched from the backend
  const [requestStatus, setRequestStatus] = useState(null); // To display the request status

  // Initialize Web3.js and MetaMask
  const initWeb3 = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" }); // Request user accounts
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  // Send a request to the blockchain
  const sendRequestToBlockchain = async () => {
    if (!courseID || !web3 || !account) {
      console.error("Missing data for request.");
      return;
    }

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
      const transaction = await contract.methods
        .createRequest(courseID) // Calls the `createRequest` method on the contract with the course ID
        .send({ from: account });

      console.log("Request sent successfully:", transaction);
      setRequestStatus("Request sent successfully!");
    } catch (error) {
      console.error("Error sending request:", error);
      setRequestStatus("Error sending request.");
    }
  };

  // Fetch course details from the backend based on the course ID
  const fetchCourseDetails = async () => {
    if (!courseID) {
      console.error("Course ID is required.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/course/${courseID}`);
      setCourseDetails(response.data); // Assuming response contains the course data
    } catch (error) {
      console.error("Error fetching course details:", error);
      setCourseDetails("Error fetching course details.");
    }
  };

  return (
    <div className="App">
      <h1>Student Request System</h1>

      {/* Button to connect to MetaMask */}
      {!web3 ? (
        <button onClick={initWeb3}>Connect to MetaMask</button>
      ) : (
        <div>
          <p>Connected Account: {account}</p>

          {/* Input field to enter the course ID */}
          <div>
            <label>Course ID: </label>
            <input
              type="number"
              value={courseID}
              onChange={(e) => setCourseID(e.target.value)}
            />
          </div>

          {/* Button to create a blockchain request */}
          <button onClick={sendRequestToBlockchain}>Create Request</button>

          {/* Display request status */}
          <div>
            <p>{requestStatus}</p>
          </div>

          {/* Button to fetch course details from backend */}
          <button onClick={fetchCourseDetails}>Fetch Course Details</button>

          {/* Display course details if available */}
          <div>
            {courseDetails && (
              <div>
                <h3>Course Details:</h3>
                <p><strong>Course Name:</strong> {courseDetails.courseName}</p>
                <p><strong>Description:</strong> {courseDetails.description}</p>
                <p><strong>Duration:</strong> {courseDetails.duration}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
