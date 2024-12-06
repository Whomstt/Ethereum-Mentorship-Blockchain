// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Contract to fetch mentorship details by department
contract Mentorship {
    // Event to be emitted when mentorship details are fetched
    event MentorshipFetchRequested(uint256 departmentId, address requester);
    function fetchMentorship(uint256 departmentId) public {
        // Emit the event
        emit MentorshipFetchRequested(departmentId, msg.sender);
    }
}
