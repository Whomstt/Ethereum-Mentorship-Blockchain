module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Local Geth node
      port: 8545, // Default Geth RPC port
      network_id: "12345", // Match any network id
      gas: 5000000, // Set the gas limit
      gasPrice: 20000000000, // Set the gas price (in Wei)
      from: "0xe508c1571ccc27ac15c7f8793112a2b35776a778", // Set the sender address
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Match your contract's version
    },
  },
};
