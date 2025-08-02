# Ethereum Mentorship Blockchain
## Description
Developed a decentralized application on Ethereum using Geth and Truffle. Implemented smart contracts enabling users to create and manage mentorship requests, demonstrating the power of blockchain for trustless, transparent interactions.

## Setup

### Dependencies

npm install -g truffle
npm install -g ganache-cli
npm install -g web3


### Ganache Guide

Terminal 1:
ganache-cli -p 8545 // Launch our nodes on Ganache

Terminal 2:
truffle migrate --network development // Deploy Contract to our local Ganache blockchain

node scripts/fetchMentorship.js 1 // Replace 1 with ID of Department to search

node scripts/fetchInterviewQuestions.js 1 // Replace 1 with ID of Question to search

## Simulate Consensus

Terminal 1:
ganache-cli -p 8545 // Launch our nodes on Ganache 10 by default each with 1000 ETH

Terminal 2:
truffle migrate --network development // Run migration to deploy our contract

truffle console --network development // Open Truffle console

const mentorship = await Mentorship.deployed(); // Fetch the deployed contract

await mentorship.fetchMentorship(1, { from: accounts[0] }); // Account 0 sends a transaction to fetch mentorship details for departmentId 1

await mentorship.fetchMentorship(2, { from: accounts[1] }); // Account 1 sends a transaction to fetch mentorship details for departmentId 2

const events = await mentorship.getPastEvents("MentorshipFetchRequested", { fromBlock: 0, toBlock: "latest" }); // Store all events from first block to latest

console.log(events); // Check emitted events to verify that transaction was included and processed

const block = await web3.eth.getBlock("latest");  // Store latest block details

console.log(block); // View latest block details

## Geth Archive

Old Geth Implementation Guide (Partial Functionality):

Terminal 1:
Launch node 1 (Paste as one command):
geth --datadir geth-network/node1 --networkid 12345 --http --http.addr 0.0.0.0 --http.port 8545 --http.corsdomain "*" --http.api web3,eth,net,personal,admin,miner --port 30303 --allow-insecure-unlock --mine --miner.threads 1 --syncmode full --unlock 0xc9123601c6de6daca62919149667614eb358dc3f --password passwords/password1.txt

Terminal 2:
Launch node 2 (Paste as one command)
geth --datadir geth-network/node2 --networkid 12345 --http --http.addr 0.0.0.0 --http.port 8546 --http.corsdomain "\*" --http.api web3,eth,net,personal,admin,miner --port 30304 --allow-insecure-unlock --ipcdisable

Terminal 3 (Paste as separate commands):
geth attach http://127.0.0.1:8545

Terminal 4 (Paste as separate commands):
geth attach http://127.0.0.1:8546

Terminal 5 (Paste one after another):
Remove-Item -Recurse -Force build
truffle migrate --network development
