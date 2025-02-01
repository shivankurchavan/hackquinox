# Decentralized Voting Application

This project is a decentralized voting application built using the Ethereum blockchain and Smart Contracts. It allows admins to create elections, add candidates, and register voters, while voters can securely cast their votes on the blockchain.

## Features

### Admin Features
- Create elections with a name, start time, and end time.
- Add voters to specific elections.
- Add candidates to specific elections.

### Voter Features
- Sign up using their Ethereum wallet address.
- View active elections.
- Cast votes for candidates in active elections.

### Blockchain Integration
- Smart contract deployed on a local Ethereum blockchain (Ganache).
- All voting data is stored on the blockchain for transparency and security.

### Backend Server
- REST API for interacting with the smart contract.
- Handles voter registration and election management.

## Prerequisites
Before running the project, ensure you have the following installed:
- **Node.js (v16 or higher)**: [Download Node.js](https://nodejs.org/)
- **Ganache**: A local Ethereum blockchain for testing. [Download Ganache](https://trufflesuite.com/ganache/)
- **Truffle (optional)**: For compiling and deploying smart contracts.
  ```bash
  npm install -g truffle
  ```
- **MongoDB**: For storing voter registration data. [Download MongoDB](https://www.mongodb.com/try/download/community)

## Project Structure
```
voting-app/
├── backend/               # Backend server code
│   ├── server.js          # Main backend server file
│   ├── package.json       # Node.js dependencies
│   └── build/             # Compiled smart contract ABI (generated by Truffle)
├── contracts/             # Smart contract code
│   └── VotingSystem.sol   # Solidity smart contract
├── migrations/            # Truffle migration files
├── README.md              # This file
└── .env                   # Environment variables (optional)
```

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/voting-app.git
cd voting-app
```

### 2. Set Up Ganache
- Open Ganache and create a new workspace.
- Note the RPC server URL (usually `http://127.0.0.1:7545`).
- Copy the private key of one of the accounts (this will be used as the admin account).

### 3. Deploy the Smart Contract
Install Truffle (if not already installed):
```bash
npm install -g truffle
```
Compile and deploy the smart contract:
```bash
truffle migrate --reset
```
Copy the contract address from the deployment logs.

### 4. Set Up the Backend
Navigate to the backend folder:
```bash
cd backend
```
Install dependencies:
```bash
npm install
```
Create a `.env` file in the backend folder and add the following variables:
```
ADMIN_PRIVATE_KEY=0xYourAdminPrivateKey
CONTRACT_ADDRESS=0xYourContractAddress
MONGODB_URI=mongodb://localhost:27017/voting-app
```
Start the backend server:
```bash
node server.js
```
The server will run on `http://localhost:3000`.

### 5. Set Up MongoDB
- Start MongoDB on your local machine.
- Create a database named `voting-app`.

### 6. Frontend (Optional)
If you have a frontend application, ensure it points to the backend server (`http://localhost:3000`). You can use tools like React, Angular, or Vue.js for the frontend.

## API Endpoints

### Admin Endpoints

**Create Election:**
```http
POST /create-election
```
**Body:**
```json
{
  "name": "Election 1",
  "startTime": 1698768000,
  "endTime": 1698854400
}
```

**Add Voter:**
```http
POST /add-voter
```
**Body:**
```json
{
  "electionId": 1,
  "voterAddress": "0xVoterAddress"
}
```

**Add Candidate:**
```http
POST /add-candidate
```
**Body:**
```json
{
  "electionId": 1,
  "candidateAddress": "0xCandidateAddress"
}
```

### Voter Endpoints

**Sign Up:**
```http
POST /signup
```
**Body:**
```json
{
  "voterAddress": "0xVoterAddress"
}
```

**Cast Vote:**
```http
POST /vote
```
**Body:**
```json
{
  "electionId": 1,
  "candidateAddress": "0xCandidateAddress",
  "voterPrivateKey": "0xVoterPrivateKey"
}
```

**Get Candidates:**
```http
GET /get-candidates/:electionId
```

**Get Votes:**
```http
GET /get-votes/:electionId/:candidateAddress
```

## Running the Application
1. Start Ganache.
2. Deploy the smart contract using Truffle.
3. Start the backend server:
   ```bash
   cd backend
   node server.js
   ```
4. Use a frontend application or tools like Postman to interact with the backend API.

## Example Workflow

### Admin:
1. Create an election using `/create-election`.
2. Add voters using `/add-voter`.
3. Add candidates using `/add-candidate`.

### Voter:
1. Sign up using `/signup`.
2. Cast a vote using `/vote`.

### View Results:
Retrieve candidate votes using `/get-votes/:electionId/:candidateAddress`.

## Troubleshooting

### Transaction Failures
- Ensure the admin and voter accounts have sufficient ETH (provided by Ganache).
- Check the contract address and ABI in the backend.

### MongoDB Connection Issues
- Ensure MongoDB is running and the connection URI is correct.

### Smart Contract Deployment
- Use `truffle migrate --reset` to redeploy the contract if changes are made.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributors
- **Your Name**

Enjoy building and using your decentralized voting application! 🚀