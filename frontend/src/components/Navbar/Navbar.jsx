"use state";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import {
  HomeIcon,
  BookOpenIcon,
  ClockIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Set initial selected state based on current path
  const [selected, setSelected] = useState(() => {
    if (location.pathname === "/logbooks") return "logs";
    if (location.pathname === "/home") return "home";
    if (location.pathname === "/history") return "history";
    return "";
  });

  const handleClickLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavClick = (nav) => {
    setSelected(nav);
    if (nav === "logs") {
      navigate("/logbooks");
    } else if (nav === "home") {
      navigate("/home");
    } else if (nav === "history") {
      navigate("/history");
    }
  };

  return (
    <div className="navbar">
      <div className="nav-button-container">
        <button className="nav-button" onClick={() => handleNavClick("home")}>
          <div
            className={`nav-button-icon-container${
              selected === "home" ? "-selected" : ""
            }`}
          >
            <HomeIcon className="icon" />
          </div>
          <p
            className={`nav-button-text${
              selected === "home" ? "-selected" : ""
            }`}
          >
            Home
          </p>
        </button>
        <button className="nav-button" onClick={() => handleNavClick("logs")}>
          <div
            className={`nav-button-icon-container${
              selected === "logs" ? "-selected" : ""
            }`}
          >
            <BookOpenIcon className="icon" />
          </div>
          <p
            className={`nav-button-text${
              selected === "logs" ? "-selected" : ""
            }`}
          >
            Logs
          </p>
        </button>
        <button
          className="nav-button"
          onClick={() => handleNavClick("history")}
        >
          <div
            className={`nav-button-icon-container${
              selected === "history" ? "-selected" : ""
            }`}
          >
            <ClockIcon className="icon" />
          </div>
          <p
            className={`nav-button-text${
              selected === "history" ? "-selected" : ""
            }`}
          >
            History
          </p>
        </button>
      </div>
      <button className="logout-button" onClick={handleClickLogout}>
        <ArrowLeftStartOnRectangleIcon className="icon" />
      </button>
    </div>
  );
}
