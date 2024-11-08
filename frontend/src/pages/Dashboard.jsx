import React from "react";
import Logo from "../components/Logo/Logo";
import CreateNewLogButton from "../components/Buttons/CreateNewLogButton";
import LogHistoryButton from "../components/Buttons/LogHistoryButton";
import "./styles/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="page-container">
      <div className="sidebar">
        <Logo variant="sidebar" />
      </div>
      <div className="main-content">
        <MainContent />
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="main-content-text">
      <span>
        Convert handwritten clinical logs to a <br />
        standardized Excel template with just a click of a button!
      </span>
      <div className="main-content-buttons">
        <Buttons />
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="buttons-container">
      <CreateNewLogButton />
      <LogHistoryButton />
    </div>
  );
}
