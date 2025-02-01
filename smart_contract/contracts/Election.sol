// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct ElectionDetails {
        uint id;
        string name;
        bool isActive;
        uint candidateCount;
        mapping(uint => Candidate) candidates;
        mapping(address => bool) voters;
    }

    struct Voter {
        uint id;
        string name;
        string aadhar;
        string email;
        string phone;
        string passwordHash;
        address walletAddress;
    }

    uint public electionCount;
    mapping(uint => ElectionDetails) public elections;

    uint public voterCount;
    mapping(uint => Voter) public voters;
    mapping(string => uint) public aadharToVoterId;
    mapping(string => uint) public emailToVoterId;
    mapping(address => uint) public walletToVoterId;

    event ElectionCreated(uint electionId, string name);
    event CandidateAdded(uint electionId, uint candidateId, string name);
    event Voted(uint electionId, uint candidateId);
    event VoterRegistered(uint voterId, string name, string email, address walletAddress);

    function createElection(string memory _name) public {
        electionCount++;
        ElectionDetails storage newElection = elections[electionCount];
        newElection.id = electionCount;
        newElection.name = _name;
        newElection.isActive = true;
        newElection.candidateCount = 0;

        emit ElectionCreated(electionCount, _name);
    }

    function addCandidate(uint _electionId, string memory _name) public {
        ElectionDetails storage election = elections[_electionId];
        require(election.isActive, "Election is not active");

        election.candidateCount++;
        election.candidates[election.candidateCount] = Candidate({
            id: election.candidateCount,
            name: _name,
            voteCount: 0
        });

        emit CandidateAdded(_electionId, election.candidateCount, _name);
    }

    function vote(uint _electionId, uint _candidateId) public {
        ElectionDetails storage election = elections[_electionId];
        require(election.isActive, "Election is not active");
        require(!election.voters[msg.sender], "You have already voted");

        election.voters[msg.sender] = true;
        election.candidates[_candidateId].voteCount++;

        emit Voted(_electionId, _candidateId);
    }

    function registerVoter(
        string memory _name,
        string memory _aadhar,
        string memory _email,
        string memory _phone,
        string memory _passwordHash,
        address _walletAddress
    ) public {
        require(aadharToVoterId[_aadhar] == 0, "Aadhar already registered");
        require(emailToVoterId[_email] == 0, "Email already registered");
        require(walletToVoterId[_walletAddress] == 0, "Wallet already registered");

        voterCount++;
        voters[voterCount] = Voter({
            id: voterCount,
            name: _name,
            aadhar: _aadhar,
            email: _email,
            phone: _phone,
            passwordHash: _passwordHash,
            walletAddress: _walletAddress
        });

        aadharToVoterId[_aadhar] = voterCount;
        emailToVoterId[_email] = voterCount;
        walletToVoterId[_walletAddress] = voterCount;

        emit VoterRegistered(voterCount, _name, _email, _walletAddress);
    }

    function getCandidate(uint _electionId, uint _candidateId) public view returns (uint, string memory, uint) {
        ElectionDetails storage election = elections[_electionId];
        Candidate memory candidate = election.candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.voteCount);
    }

    function getElectionDetails(uint _electionId) public view returns (uint, string memory, bool, uint) {
        ElectionDetails storage election = elections[_electionId];
        return (election.id, election.name, election.isActive, election.candidateCount);
    }

    function getVoterDetails(uint _voterId) public view returns (uint, string memory, string memory, string memory, string memory, address) {
        Voter memory voter = voters[_voterId];
        return (voter.id, voter.name, voter.aadhar, voter.email, voter.phone, voter.walletAddress);
    }

    function getVoterByWallet(address _walletAddress) public view returns (uint, string memory, string memory, string memory, string memory, address) {
        uint voterId = walletToVoterId[_walletAddress];
        require(voterId != 0, "Voter not found");
        Voter memory voter = voters[voterId];
        return (voter.id, voter.name, voter.aadhar, voter.email, voter.phone, voter.walletAddress);
    }

    // New function to get election results
    function getElectionResults(uint _electionId) public view returns (string[] memory, uint[] memory) {
        ElectionDetails storage election = elections[_electionId];
        require(!election.isActive, "Election is still active");

        string[] memory candidateNames = new string[](election.candidateCount);
        uint[] memory voteCounts = new uint[](election.candidateCount);

        for (uint i = 1; i <= election.candidateCount; i++) {
            candidateNames[i - 1] = election.candidates[i].name;
            voteCounts[i - 1] = election.candidates[i].voteCount;
        }

        return (candidateNames, voteCounts);
    }
}