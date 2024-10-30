import React from "react";
import Logo from "../components/Logo/Logo";
import MainContent from "../components/Dashboard/MainContent";

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
