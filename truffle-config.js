module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",   // Ganache CLI default host
      port: 8545,           // Ganache CLI default port
      network_id: "*",      // Match any network ID
      gas: 5000000,         // Set the gas limit
      gasPrice: 20000000000, // Set the gas price (in Wei)
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",    // Match your contract's Solidity version
    },
  },
};
