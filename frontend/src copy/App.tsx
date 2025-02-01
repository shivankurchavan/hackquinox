// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminLogin } from "./components/AdminLogin"; // Ensure correct import path
import { Dashboard } from "./components/Dashboard"; // Ensure correct import path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
