import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Vote, Calendar, Users, Award, Clock } from 'lucide-react';

export default function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="glass-effect shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <Vote className="h-8 w-8 text-[#4B0082]" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4B0082] to-[#800080]">
                VoteSafe
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl text-sm font-medium text-white bg-[#4B0082] hover:bg-[#3B0062] transform transition-all duration-200 hover:scale-105"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Elections */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Award className="h-8 w-8 text-[#4B0082] mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Active Elections</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={`active-${i}`} className="bg-white rounded-xl shadow-lg p-6 hover-scale border border-gray-100">
                <h3 className="text-xl font-semibold text-[#4B0082] mb-3">Student Council Election {i}</h3>
                <p className="text-gray-600 mb-4">Cast your vote for the student council representatives.</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Ends in 2 days</span>
                </div>
                <button className="w-full bg-[#4B0082] text-white py-3 rounded-xl hover:bg-[#3B0062] transform transition-all duration-200 hover:scale-105">
                  Vote Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Elections */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Calendar className="h-8 w-8 text-[#4B0082] mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Elections</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map((i) => (
              <div key={`upcoming-${i}`} className="bg-white rounded-xl shadow-lg p-6 hover-scale border border-gray-100">
                <h3 className="text-xl font-semibold text-[#4B0082] mb-3">Department Election {i}</h3>
                <p className="text-gray-600 mb-4">Starting in 3 days</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>March 30th, 2024</span>
                </div>
                <button className="w-full bg-gray-100 text-gray-500 py-3 rounded-xl cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Apply for Elections */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Users className="h-8 w-8 text-[#4B0082] mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Apply for Elections</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map((i) => (
              <div key={`apply-${i}`} className="bg-white rounded-xl shadow-lg p-6 hover-scale border border-gray-100">
                <h3 className="text-xl font-semibold text-[#4B0082] mb-3">Class Representative Election {i}</h3>
                <p className="text-gray-600 mb-4">Applications open until March 30th</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Users className="h-4 w-4 mr-2" />
                  <span>5 positions available</span>
                </div>
                <button className="w-full bg-[#4B0082] text-white py-3 rounded-xl hover:bg-[#3B0062] transform transition-all duration-200 hover:scale-105">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Vote className="h-6 w-6 text-[#4B0082] mr-2" />
              <span className="text-xl font-bold text-[#4B0082]">VoteSafe</span>
            </div>
            <p className="text-gray-600">© 2024 VoteSafe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}