// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 public storedData;

    // Store a value
    function set(uint256 x) public {
        storedData = x;
    }

    // Retrieve the stored value
    function get() public view returns (uint256) {
        return storedData;
    }
}
