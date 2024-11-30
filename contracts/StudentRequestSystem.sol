// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRequestSystem {

    // Struct to represent a student request
    struct Request {
        address student;     // The address of the student making the request
        uint256 courseId;    // The ID of the requested course
        uint256 timestamp;   // When the request was made
        bool fulfilled;      // Whether the request has been processed (fulfilled)
    }

    // A mapping to store student requests by request ID
    mapping(uint256 => Request) public requests;

    // A counter for the number of requests made
    uint256 public requestCount;

    // Event to notify when a new request is created
    event RequestCreated(address indexed student, uint256 indexed requestId, uint256 courseId, uint256 timestamp);
    
    // Event to notify when a request is marked as fulfilled
    event RequestFulfilled(uint256 indexed requestId);

    // Function to create a new request
    function createRequest(uint256 _courseId) public {
        // Increment the request count
        requestCount++;

        // Create the new request and store it in the mapping
        requests[requestCount] = Request({
            student: msg.sender,
            courseId: _courseId,
            timestamp: block.timestamp,
            fulfilled: false
        });

        // Emit the RequestCreated event
        emit RequestCreated(msg.sender, requestCount, _courseId, block.timestamp);
    }

    // Function to get details of a request by its ID
    function getRequest(uint256 _requestId) public view returns (address, uint256, uint256, bool) {
        Request memory req = requests[_requestId];
        return (req.student, req.courseId, req.timestamp, req.fulfilled);
    }

    // Function to mark a request as fulfilled (e.g., when the student is provided with the requested course info)
    function fulfillRequest(uint256 _requestId) public {
        Request storage req = requests[_requestId];
        require(req.student != address(0), "Request does not exist");  // Ensure the request exists
        require(!req.fulfilled, "Request already fulfilled");

        // Mark the request as fulfilled
        req.fulfilled = true;

        // Emit the RequestFulfilled event
        emit RequestFulfilled(_requestId);
    }

    // Additional function to check if a request is fulfilled
    function isRequestFulfilled(uint256 _requestId) public view returns (bool) {
        return requests[_requestId].fulfilled;
    }
}
