Dependencies:

npm install -g truffle
npm install -g ganache-cli
npm install -g web3


Ganache Guide:

Terminal 1:
ganache-cli -p 8545

Terminal 2:
truffle migrate --network development
node scripts/fetchMentorship.js 1 // Replace 1 with ID of Department to search





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
