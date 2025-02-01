import React, { useState } from 'react';
import { BarChart, Users, Clock, ChevronDown, ChevronUp, Building2, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Booth {
  id: string;
  name: string;
  totalVoters: number;
  votedCount: number;
}

interface Candidate {
  name: string;
  votes: number;
}

interface OngoingElection {
  id: number;
  title: string;
  totalVoters: number;
  totalVoted: number;
  remainingTime: string;
  candidates: Candidate[];
  booths: Booth[];
}

interface UpcomingElection {
  id: number;
  title: string;
  startDate: string;
  candidates: number;
}

const mockOngoingElections: OngoingElection[] = [
  {
    id: 1,
    title: 'Student Council Election 2024',
    totalVoters: 200,
    totalVoted: 150,
    remainingTime: '2 days',
    candidates: [
      { name: 'John Doe', votes: 75 },
      { name: 'Jane Smith', votes: 45 },
      { name: 'Bob Johnson', votes: 30 },
    ],
    booths: [
      { id: 'b1', name: 'Booth A', totalVoters: 80, votedCount: 75 },
      { id: 'b2', name: 'Booth B', totalVoters: 70, votedCount: 45 },
      { id: 'b3', name: 'Booth C', totalVoters: 50, votedCount: 30 },
    ],
  },
];

const mockUpcomingElections: UpcomingElection[] = [
  {
    id: 2,
    title: 'Department Head Election',
    startDate: '2024-03-20',
    candidates: 4,
  },
  {
    id: 3,
    title: 'Club President Election',
    startDate: '2024-03-25',
    candidates: 3,
  },
];

function MonitorElections() {
  const [expandedElection, setExpandedElection] = useState<number | null>(null);

  const toggleElection = (id: number) => {
    setExpandedElection(expandedElection === id ? null : id);
  };

  const getBoothStatus = (booth: Booth) => {
    const ratio = (booth.votedCount / booth.totalVoters) * 100;
    if (ratio >= 75) return { icon: TrendingUp, color: 'text-green-600', text: 'High Turnout' };
    if (ratio <= 35) return { icon: TrendingDown, color: 'text-red-600', text: 'Low Turnout' };
    return { icon: Minus, color: 'text-yellow-600', text: 'Moderate Turnout' };
  };

  return (
    <div className="space-y-8">
      {/* Ongoing Elections */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ongoing Elections</h2>
        <div className="grid gap-6">
          {mockOngoingElections.map((election) => (
            <div key={election.id} className="bg-white rounded-lg shadow">
              <div 
                className="p-6 cursor-pointer"
                onClick={() => toggleElection(election.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{election.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                      Active
                    </span>
                  </div>
                  {expandedElection === election.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {election.totalVoted} of {election.totalVoters} voted
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {election.remainingTime} remaining
                    </span>
                  </div>
                </div>

                {/* Basic Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full"
                      style={{ width: `${(election.totalVoted / election.totalVoters) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedElection === election.id && (
                <div className="border-t border-gray-200 p-6">
                  {/* Overall Statistics */}
                  <div className="mb-8">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Overall Statistics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Total Voters</div>
                        <div className="text-2xl font-bold text-gray-900">{election.totalVoters}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Votes Cast</div>
                        <div className="text-2xl font-bold text-gray-900">{election.totalVoted}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Voter Turnout</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {Math.round((election.totalVoted / election.totalVoters) * 100)}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booth Statistics */}
                  <div className="mb-8">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Booth Statistics(Upcoming Feature)</h4>
                    <div className="grid gap-4">
                      {election.booths.map((booth) => {
                        const status = getBoothStatus(booth);
                        const StatusIcon = status.icon;
                        return (
                          <div key={booth.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center space-x-2">
                                <Building2 className="h-5 w-5 text-gray-400" />
                                <span className="font-medium text-gray-900">{booth.name}</span>
                              </div>
                              <div className={`flex items-center space-x-1 ${status.color}`}>
                                <StatusIcon className="h-4 w-4" />
                                <span className="text-sm">{status.text}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Votes Cast</span>
                                <span className="font-medium">{booth.votedCount} of {booth.totalVoters}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-indigo-600 h-2 rounded-full"
                                  style={{ width: `${(booth.votedCount / booth.totalVoters) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Current Results - Now Highlighted */}
                  <div className="bg-indigo-50 rounded-xl p-6 border-2 border-indigo-100">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xl font-bold text-indigo-900">Current Results</h4>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                        Live Updates
                      </span>
                    </div>
                    <div className="space-y-6">
                      {election.candidates.map((candidate, index) => {
                        const percentage = Math.round((candidate.votes / election.totalVoted) * 100);
                        return (
                          <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-lg font-semibold text-gray-900">
                                {candidate.name}
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold text-indigo-600">
                                  {percentage}%
                                </span>
                                <span className="text-sm text-gray-500">
                                  ({candidate.votes} votes)
                                </span>
                              </div>
                            </div>
                            <div className="relative pt-1">
                              <div className="flex mb-2 items-center justify-between">
                                <div>
                                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                    Progress
                                  </span>
                                </div>
                              </div>
                              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-indigo-100">
                                <div
                                  style={{ width: `${percentage}%` }}
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Elections */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Elections</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {mockUpcomingElections.map((election) => (
            <div key={election.id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {election.title}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Start Date</span>
                  <span className="text-sm font-medium">{election.startDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Candidates</span>
                  <span className="text-sm font-medium">{election.candidates}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MonitorElections;