// index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App.tsx";
import "./index.css";
import { AuthProvider } from "./src/context/AuthContext"; // Ensure correct import path
import React from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
