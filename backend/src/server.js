const express = require("express");
const Web3 = require("web3");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to Ganache (local Ethereum blockchain)
const web3 = new Web3("http://127.0.0.1:9545"); // Replace with your Ganache RPC URL

// Load the smart contract ABI and address
const contractABI = require("../contracts/VotingSystemABI.json"); // Replace with your contract ABI
const contractAddress = "0x5b4ab74c1757707CcabC23C36f24D19F9Ba18086"; // Replace with your deployed contract address

// Create a contract instance
const votingContract = new web3.eth.Contract(contractABI, contractAddress);

// Admin private key (for signing transactions)
const adminPrivateKey = "0x0b0b96f02c7d8fc736e7b6b918733a6d8e06a454aca0a9a1da8fdf4a5b4a82b3"; // Replace with your admin's private key
const adminAccount = web3.eth.accounts.privateKeyToAccount(adminPrivateKey);

// Endpoint: Create a new election
app.post("/create-election", async (req, res) => {
    const { name, startTime, endTime } = req.body;

    try {
        const tx = votingContract.methods.createElection(name, startTime, endTime);
        const gas = await tx.estimateGas({ from: adminAccount.address });
        const signedTx = await adminAccount.signTransaction({
            to: contractAddress,
            data: tx.encodeABI(),
            gas,
        });

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.status(200).json({ message: "Election created successfully", receipt });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint: Add a voter to an election
app.post("/add-voter", async (req, res) => {
    const { electionId, voterAddress } = req.body;

    try {
        const tx = votingContract.methods.addVoter(electionId, voterAddress);
        const gas = await tx.estimateGas({ from: adminAccount.address });
        const signedTx = await adminAccount.signTransaction({
            to: contractAddress,
            data: tx.encodeABI(),
            gas,
        });

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.status(200).json({ message: "Voter added successfully", receipt });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint: Add a candidate to an election
app.post("/add-candidate", async (req, res) => {
    const { electionId, candidateAddress } = req.body;

    try {
        const tx = votingContract.methods.addCandidate(electionId, candidateAddress);
        const gas = await tx.estimateGas({ from: adminAccount.address });
        const signedTx = await adminAccount.signTransaction({
            to: contractAddress,
            data: tx.encodeABI(),
            gas,
        });

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.status(200).json({ message: "Candidate added successfully", receipt });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint: Cast a vote
app.post("/vote", async (req, res) => {
    const { electionId, candidateAddress, voterPrivateKey } = req.body;

    try {
        const voterAccount = web3.eth.accounts.privateKeyToAccount(voterPrivateKey);
        const tx = votingContract.methods.vote(electionId, candidateAddress);
        const gas = await tx.estimateGas({ from: voterAccount.address });
        const signedTx = await voterAccount.signTransaction({
            to: contractAddress,
            data: tx.encodeABI(),
            gas,
        });

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.status(200).json({ message: "Vote cast successfully", receipt });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint: Get candidates for an election
app.get("/get-candidates/:electionId", async (req, res) => {
    const { electionId } = req.params;

    try {
        const candidates = await votingContract.methods.getCandidates(electionId).call();
        res.status(200).json({ candidates });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint: Get votes for a candidate in an election
app.get("/get-votes/:electionId/:candidateAddress", async (req, res) => {
    const { electionId, candidateAddress } = req.params;

    try {
        const votes = await votingContract.methods.getVotes(electionId, candidateAddress).call();
        res.status(200).json({ votes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
