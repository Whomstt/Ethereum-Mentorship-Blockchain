// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InterviewQuestions {

    // Event to be emitted when a fetch request is made
    event InterviewQuestionsFetchRequested(uint256 departmentId, address requester);

    // Function to request InterviewQuestions data by department ID
    function fetchInterviewQuestions(uint256 departmentId) public {
        // Emit the fetch request event with the department ID and the sender's address
        emit InterviewQuestionsFetchRequested(departmentId, msg.sender);
    }
}
