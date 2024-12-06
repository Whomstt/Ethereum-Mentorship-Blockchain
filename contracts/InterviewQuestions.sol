// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Contract to fetch interview q answers by question id
contract InterviewQuestions {
    // Event to be emitted when interview q answers are fetched
    event InterviewQuestionsFetchRequested(uint256 questionId, address requester);
    function fetchInterviewQuestions(uint256 questionId) public {
        // Emit the event
        emit InterviewQuestionsFetchRequested(questionId, msg.sender);
    }
}
