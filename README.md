Currently to test:

Run this command in one terminal: 
geth --dev --http --http.api personal,eth,net,web3,miner,debug

And this command in another:
truffle compile
truffle migrate --network development
