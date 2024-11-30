package main

import (
	"fmt"
	"log"
	"math/big"
	"os"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/ethereum/go-ethereum"
)

const (
	infuraURL          = "http://localhost:8545" // Change this to your Geth RPC endpoint or Infura endpoint
	contractAddress    = "0xYourContractAddress" // Replace with your deployed contract address
	privateKeyHex      = "0xYourPrivateKey"      // Your private key (e.g., from Metamask or another wallet)
	contractABI        = `[YOUR_ABI_JSON_HERE]` // Replace with your contract's ABI (JSON format)
)

var (
	client      *ethclient.Client
	contract    *ethereum.Contract
	privateKey  *crypto.PrivateKey
	senderAddress common.Address
)

func init() {
	// Connect to Ethereum client
	var err error
	client, err = ethclient.Dial(infuraURL)
	if err != nil {
		log.Fatalf("Failed to connect to the Ethereum client: %v", err)
	}

	// Load private key
	privateKey, err = crypto.HexToECDSA(privateKeyHex)
	if err != nil {
		log.Fatalf("Failed to load private key: %v", err)
	}

	// Derive sender address from private key
	senderAddress = crypto.PubkeyToAddress(privateKey.PublicKey)
}

// Function to send a request (createRequest)
func createRequest(courseID int) error {
	// Load contract ABI
	parsedABI, err := abi.JSON(strings.NewReader(contractABI))
	if err != nil {
		log.Fatalf("Failed to parse contract ABI: %v", err)
	}

	// Create the transaction data (function call data for createRequest)
	data, err := parsedABI.Pack("createRequest", big.NewInt(int64(courseID)))
	if err != nil {
		return fmt.Errorf("failed to pack data for createRequest: %v", err)
	}

	// Get the current nonce for the sender address
	nonce, err := client.PendingNonceAt(nil, senderAddress)
	if err != nil {
		return fmt.Errorf("failed to get nonce: %v", err)
	}

	// Set up the transaction
	tx := ethereum.NewTransaction(
		nonce,                   // nonce
		common.HexToAddress(contractAddress), // contract address
		big.NewInt(0),           // no value (we are not sending ETH)
		200000,                  // gas limit (adjustable as needed)
		big.NewInt(20000000000), // gas price (20 Gwei)
		data,                    // contract call data
	)

	// Sign the transaction
	signedTx, err := ethereum.SignTx(tx, ethereum.NewEIP155Signer(big.NewInt(1)), privateKey)
	if err != nil {
		return fmt.Errorf("failed to sign transaction: %v", err)
	}

	// Send the transaction
	err = client.SendTransaction(nil, signedTx)
	if err != nil {
		return fmt.Errorf("failed to send transaction: %v", err)
	}

	fmt.Println("Transaction sent:", signedTx.Hash().Hex())
	return nil
}

// Function to get request details (getRequest)
func getRequest(requestID int) error {
	// Load contract ABI
	parsedABI, err := abi.JSON(strings.NewReader(contractABI))
	if err != nil {
		log.Fatalf("Failed to parse contract ABI: %v", err)
	}

	// Prepare data for the `getRequest` function call
	data, err := parsedABI.Pack("getRequest", big.NewInt(int64(requestID)))
	if err != nil {
		return fmt.Errorf("failed to pack data for getRequest: %v", err)
	}

	// Send the call to the contract
	result, err := client.CallContract(nil, ethereum.CallMsg{
		To:   common.HexToAddress(contractAddress),
		Data: data,
	}, nil)
	if err != nil {
		return fmt.Errorf("failed to call contract: %v", err)
	}

	// Decode the result
	var studentAddress common.Address
	var courseID *big.Int
	var timestamp *big.Int
	var fulfilled bool

	// Parse the returned data using the ABI
	err = parsedABI.UnpackIntoInterface(&studentAddress, result, "getRequest")
	if err != nil {
		return fmt.Errorf("failed to unpack data: %v", err)
	}

	// Print the result
	fmt.Printf("Request Details:\n")
	fmt.Printf("Student Address: %s\n", studentAddress.Hex())
	fmt.Printf("Course ID: %d\n", courseID.Int64())
	fmt.Printf("Timestamp: %d\n", timestamp.Int64())
	fmt.Printf("Fulfilled: %v\n", fulfilled)

	return nil
}

func main() {
	// Example to create a new request
	err := createRequest(1) // Create request for course ID 1
	if err != nil {
		log.Fatalf("Failed to create request: %v", err)
	}

	// Example to get a request (request ID 1)
	err = getRequest(1) // Get request details for request ID 1
	if err != nil {
		log.Fatalf("Failed to get request: %v", err)
	}
}
