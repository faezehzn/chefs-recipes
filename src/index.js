import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Router } from "react-router-dom";
import History from "./components/History";
import { ContextProvider } from "./context/customContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Warning: Legacy context API -----> for existting StrictMode
  <React.StrictMode>
    <Router location={History.location} navigator={History} history={History}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Router>
  </React.StrictMode>
);
