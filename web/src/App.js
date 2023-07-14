import "./App.css";
import { Outlet } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Fab from "@mui/material/Fab";
import GitHubIcon from "@mui/icons-material/GitHub";
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Outlet />
        <Fab
          color="primary"
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
          }}
          href="https://github.com/MirDie/mini-resume"
          target="_blank"
        >
          <GitHubIcon />
        </Fab>
      </div>
    </AuthProvider>
  );
}

export default App;
