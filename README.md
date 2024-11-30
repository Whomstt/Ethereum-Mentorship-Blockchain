Node info with account details in nodes_info.txt

Currently to test:

Terminal 1:
Launch node 1 (Paste as one command):
geth --datadir node1 --networkid 12345 --http --http.addr 0.0.0.0 --http.port 8545 --http.corsdomain "*" --http.api web3,eth,net,personal,admin,miner --port 30303 --allow-insecure-unlock

Terminal 2:
Launch node 2 (Paste as one command)
geth --datadir node2 --networkid 12345 --http --http.addr 0.0.0.0 --http.port 8546 --http.corsdomain "*" --http.api web3,eth,net,personal,admin,miner --port 30304 --allow-insecure-unlock --ipcdisable

Terminal 3 (Paste one after another):
truffle compile
truffle migrate --network development