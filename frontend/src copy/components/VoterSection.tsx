import React, { useState } from 'react';
import { Key, Check, X } from 'lucide-react';

interface Voter {
  id: number;
  name: string;
  publicKey: string;
  privateKey: string;
  requestedBooth: string;
  approved: boolean;
}

interface VotingBooth {
  id: string;
  name: string;
  voters: Voter[];
}

const mockVoters: Voter[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    publicKey: '0x7F4a8B...3c2D',
    privateKey: '0xA1B2C3...Z9',
    requestedBooth: 'Booth A',
    approved: true,
  },
  {
    id: 2,
    name: 'Bob Wilson',
    publicKey: '0x9E3d2C...4f1A',
    privateKey: '0xD4E5F6...Y8',
    requestedBooth: 'Booth B',
    approved: false,
  },
  {
    id: 3,
    name: 'Carol Martinez',
    publicKey: '0x2B5c8D...9a4E',
    privateKey: '0xG7H8I9...X7',
    requestedBooth: 'Booth A',
    approved: true,
  },
];

const mockBooths: VotingBooth[] = [
  {
    id: 'booth-a',
    name: 'Booth A',
    voters: mockVoters.filter(v => v.requestedBooth === 'Booth A' && v.approved),
  },
  {
    id: 'booth-b',
    name: 'Booth B',
    voters: mockVoters.filter(v => v.requestedBooth === 'Booth B' && v.approved),
  },
];

function VoterSection() {
  const [voters, setVoters] = useState<Voter[]>(mockVoters);
  const [booths] = useState<VotingBooth[]>(mockBooths);

  const handleApproval = (voterId: number) => {
    setVoters(voters.map(voter => 
      voter.id === voterId ? { ...voter, approved: !voter.approved } : voter
    ));
  };

  return (
    <div className="space-y-8">
      {/* Pending Approvals */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900">Pending Booth Allocations</h2>
          <p className="mt-1 text-sm text-gray-600">
            Approve or reject voters' booth allocation requests
          </p>
        </div>
        
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Voter
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested Booth
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Public Key
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Private Key
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {voters.map((voter) => (
                <tr key={voter.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{voter.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{voter.requestedBooth}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Key className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{voter.publicKey}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Key className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{voter.privateKey}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {voter.approved ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Check className="h-4 w-4 mr-1" />
                        Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleApproval(voter.id)}
                      className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                        voter.approved
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {voter.approved ? 'Revoke' : 'Approve'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Voting Booths */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900">Voting Booths</h2>
          <p className="mt-1 text-sm text-gray-600">
            List of approved voters by voting booth
          </p>
        </div>
        
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {booths.map((booth) => (
              <div key={booth.id} className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{booth.name}</h3>
                <div className="space-y-2">
                  {booth.voters.length > 0 ? (
                    booth.voters.map((voter) => (
                      <div key={voter.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                        <span className="text-sm font-medium text-gray-900">{voter.name}</span>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Key className="h-4 w-4" />
                          <span>{voter.publicKey}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No approved voters yet</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoterSection;