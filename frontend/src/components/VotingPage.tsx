import React, { useState } from 'react';
import { Vote, User2, CheckCircle2, Home } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  position: string;
  votes: number;
  imageUrl: string;
}

function App() {
  const [hasVoted, setHasVoted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      position: "President",
      votes: 0,
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "President",
      votes: 0,
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "President",
      votes: 0,
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
    }
  ]);

  const initiateVote = (candidate: Candidate) => {
    if (!hasVoted) {
      setSelectedCandidate(candidate);
      setShowConfirmation(true);
    }
  };

  const handleVote = () => {
    if (!hasVoted && selectedCandidate) {
      setCandidates(candidates.map(candidate =>
        candidate.id === selectedCandidate.id
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      ));
      setHasVoted(true);
      setShowConfirmation(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setSelectedCandidate(null);
  };

  const handleHome = () => {
    setHasVoted(false);
    setShowConfirmation(false);
    setSelectedCandidate(null);
    setCandidates(candidates.map(candidate => ({ ...candidate, votes: 0 })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
      
      <div className="relative container mx-auto px-4 py-8">
        <button
          onClick={handleHome}
          className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-gray-800/50 text-white rounded-lg backdrop-blur-sm border border-gray-700/50 hover:bg-gray-800/70 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Vote className="w-12 h-12 text-violet-400 mr-3" />
            <h1 className="text-4xl font-bold text-white">Election 2024</h1>
          </div>
          <p className="text-violet-200 text-lg">Cast your vote for the next president</p>
        </div>

        {hasVoted && (
          <div className="mb-8 bg-green-900/50 backdrop-blur-sm border border-green-700/50 p-4 rounded-lg text-green-300 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Thank you for voting! Your vote has been recorded.
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:bg-gray-800/70">
              <div className="relative">
                <img
                  src={candidate.imageUrl}
                  alt={candidate.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 m-4 bg-violet-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-violet-500/50">
                  {candidate.votes} votes
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <User2 className="w-5 h-5 text-violet-400 mr-2" />
                  <h2 className="text-xl font-semibold text-white">{candidate.name}</h2>
                </div>
                <p className="text-violet-200 mb-4">{candidate.position}</p>
                <button
                  onClick={() => initiateVote(candidate)}
                  disabled={hasVoted}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                    hasVoted
                      ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                      : 'bg-violet-600 text-white hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-600/25'
                  }`}
                >
                  {hasVoted ? 'Voted' : 'Vote'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-violet-200">
          <p>Voting closes in 24 hours</p>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && selectedCandidate && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-800/90 border border-gray-700/50 rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Confirm Your Vote</h2>
            <p className="text-violet-200 mb-6">
              Are you sure you want to vote for <span className="font-semibold text-white">{selectedCandidate.name}</span>?
              This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleVote}
                className="flex-1 bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition-colors"
              >
                Confirm Vote
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-700/50 text-violet-200 py-2 px-4 rounded-lg hover:bg-gray-700/70 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;