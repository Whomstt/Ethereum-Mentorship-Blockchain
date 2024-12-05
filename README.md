Node info with account details in nodes_info.txt

Currently to test:

Terminal 1:
Launch node 1 (Paste as one command):
geth --datadir node1 --networkid 12345 --http --http.addr 0.0.0.0 --http.port 8545 --http.corsdomain "\*" --http.api web3,eth,net,personal,admin,miner --port 30303 --allow-insecure-unlock --mine --miner.threads 1 --syncmode full

Terminal 2:
Launch node 2 (Paste as one command)
geth --datadir node2 --networkid 12345 --http --http.addr 0.0.0.0 --http.port 8546 --http.corsdomain "\*" --http.api web3,eth,net,personal,admin,miner --port 30304 --allow-insecure-unlock --ipcdisable

Terminal 3 (Paste as separate commands):
geth attach http://127.0.0.1:8545
personal.unlockAccount("0xc9123601c6de6daca62919149667614eb358dc3f", "Valid1234$", 600)

Terminal 4 (Paste as separate commands):
geth attach http://127.0.0.1:8546

Terminal 5 (Paste one after another):
Remove-Item -Recurse -Force build
truffle compile --all
truffle migrate --network development
