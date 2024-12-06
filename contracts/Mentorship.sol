// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Mentorship {

    // Event to be emitted when a fetch request is made
    event MentorshipFetchRequested(uint256 departmentId, address requester);

    // Function to request mentorship data by department ID
    function fetchMentorship(uint256 departmentId) public {
        // Emit the fetch request event with the department ID and the sender's address
        emit MentorshipFetchRequested(departmentId, msg.sender);
    }
}
