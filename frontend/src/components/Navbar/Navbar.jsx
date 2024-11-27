"use state";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import {
  HomeIcon,
  BookOpenIcon,
  ClockIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const [selected, setSelected] = useState("home");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClickLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="nav-button-container">
        <button className="nav-button" onClick={() => setSelected("home")}>
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
        <button className="nav-button" onClick={() => setSelected("logs")}>
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
        <button className="nav-button" onClick={() => setSelected("history")}>
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
