import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import {Dashboard} from "./components/Dashboard";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import VotingPage from "./components/VotingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/voting" element={<VotingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
