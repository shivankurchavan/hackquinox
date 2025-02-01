const express = require('express');
const { ethers } = require('ethers');
const dotenv = require('dotenv');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Ganache
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL); // Use ethers.JsonRpcProvider
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY , provider); // Use a private key from Ganache

// Import contract ABI and address
const contractABI = require('../contracts/ElectionABI.json');
const contractAddress = process.env.CONTRACT_ADDRESS;

// Create contract instance
const electionContract = new ethers.Contract(contractAddress, contractABI, wallet);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const otpStore = {};

// API to create an election
app.post('/createElection', async (req, res) => {
    const { name } = req.body;
    const tx = await electionContract.createElection(name);
    await tx.wait();
    res.json({ transactionHash: tx.hash });
});

// API to add a candidate
app.post('/addCandidate', async (req, res) => {
    const { electionId, name } = req.body;
    const tx = await electionContract.addCandidate(electionId, name);
    await tx.wait();
    res.json({ transactionHash: tx.hash });
});

// API to vote
app.post('/vote', async (req, res) => {
    const { electionId, candidateId } = req.body;
    const tx = await electionContract.vote(electionId, candidateId);
    await tx.wait();
    res.json({ transactionHash: tx.hash });
});

// API to get election details
app.get('/election/:id', async (req, res) => {
    const electionId = req.params.id;
    const result = await electionContract.getElectionDetails(electionId);
    res.json(result);
});

// API to get candidate details
app.get('/candidate/:electionId/:candidateId', async (req, res) => {
    const { electionId, candidateId } = req.params;
    const result = await electionContract.getCandidate(electionId, candidateId);
    res.json(result);
});

// API to register a voter
app.post('/registerVoter', async (req, res) => {
    const { name, aadhar, email, phone, password, confirmPassword, walletAddress } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'OTP for Voter Registration',
        text: `Your OTP for voter registration is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Error sending OTP' });
        } else {
            res.json({ message: 'OTP sent to email' });
        }
    });
});

// API to verify OTP and register voter on blockchain
app.post('/verifyOtp', async (req, res) => {
    const { name, aadhar, email, phone, password, otp, walletAddress } = req.body;

    if (otpStore[email] != otp) {
        return res.status(400).json({ error: 'Invalid OTP' });
    }

    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    const tx = await electionContract.registerVoter(name, aadhar, email, phone, passwordHash, walletAddress);
    await tx.wait();

    delete otpStore[email];

    res.json({ transactionHash: tx.hash });
});

// API to get voter details by wallet address
app.get('/voterByWallet/:walletAddress', async (req, res) => {
    const walletAddress = req.params.walletAddress;
    const result = await electionContract.getVoterByWallet(walletAddress);
    res.json(result);
});

// API to get election results
app.get('/electionResults/:electionId', async (req, res) => {
    const electionId = req.params.electionId;
    try {
        const result = await electionContract.getElectionResults(electionId);
        res.json({
            candidateNames: result[0],
            voteCounts: result[1]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});