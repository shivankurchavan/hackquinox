// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Election {
        uint id;
        string name;
        uint startTime;
        uint endTime;
        bool isActive;
        address[] candidates;
        mapping(address => uint) votesReceived;
        mapping(address => bool) voters;
    }

    address public admin;
    uint public electionCount;
    mapping(uint => Election) public elections;

    event ElectionCreated(uint electionId, string name, uint startTime, uint endTime);
    event VoterAdded(uint electionId, address voter);
    event CandidateAdded(uint electionId, address candidate);
    event Voted(uint electionId, address voter, address candidate);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyDuringElection(uint _electionId) {
        require(elections[_electionId].isActive, "Election is not active");
        require(block.timestamp >= elections[_electionId].startTime, "Election has not started yet");
        require(block.timestamp <= elections[_electionId].endTime, "Election has ended");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function createElection(string memory _name, uint _startTime, uint _endTime) public onlyAdmin {
        require(_startTime < _endTime, "Start time must be before end time");

        electionCount++;
        Election storage newElection = elections[electionCount];
        newElection.id = electionCount;
        newElection.name = _name;
        newElection.startTime = _startTime;
        newElection.endTime = _endTime;
        newElection.isActive = true;

        emit ElectionCreated(electionCount, _name, _startTime, _endTime);
    }

    function addVoter(uint _electionId, address _voter) public onlyAdmin {
        require(!elections[_electionId].voters[_voter], "Voter already added");

        elections[_electionId].voters[_voter] = true;
        emit VoterAdded(_electionId, _voter);
    }

    function addCandidate(uint _electionId, address _candidate) public onlyAdmin {
        elections[_electionId].candidates.push(_candidate);
        emit CandidateAdded(_electionId, _candidate);
    }

    function vote(uint _electionId, address _candidate) public onlyDuringElection(_electionId) {
        require(elections[_electionId].voters[msg.sender], "You are not authorized to vote in this election");
        require(!hasVoted(_electionId, msg.sender), "You have already voted");

        elections[_electionId].votesReceived[_candidate]++;
        elections[_electionId].voters[msg.sender] = false; // Mark as voted
        emit Voted(_electionId, msg.sender, _candidate);
    }

    function hasVoted(uint _electionId, address _voter) public view returns (bool) {
        return !elections[_electionId].voters[_voter];
    }

    function getCandidates(uint _electionId) public view returns (address[] memory) {
        return elections[_electionId].candidates;
    }

    function getVotes(uint _electionId, address _candidate) public view returns (uint) {
        return elections[_electionId].votesReceived[_candidate];
    }
}