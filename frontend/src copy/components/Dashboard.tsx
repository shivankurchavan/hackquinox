import { LogOut, Vote, BarChart3, Users, Shield } from "lucide-react";
import CreateElection from "./CreateElection";
import MonitorElections from "./MonitorElections";
import VoterSection from "./VoterSection";
import { useState } from "react";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("create");

  const tabs = [
    { id: "create", label: "Create", icon: Vote },
    { id: "monitor", label: "Monitor", icon: BarChart3 },
    { id: "voter", label: "Voter", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">VOTESAFE</h1>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex space-x-4">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition ${
                activeTab === id
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "create" && <CreateElection />}
        {activeTab === "monitor" && <MonitorElections />}
        {activeTab === "voter" && <VoterSection />}
      </main>
    </div>
  );
};
