module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Local Geth node
      port: 8545, // Default Geth RPC port
      network_id: "12345", // Match any network id
      gas: 5000000, // Set the gas limit
      gasPrice: 20000000000, // Set the gas price (in Wei)
      from: "0xc9123601c6de6daca62919149667614eb358dc3f", // Set the sender address
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Match your contract's version
    },
  },
};
