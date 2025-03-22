import {
  UserCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ProfileBar.css";

const ProfileBar = () => {
  const location = useLocation();
  const isSettingsPage = location.pathname === "/settings";
  const [isOpen, setIsOpen] = useState(isSettingsPage);
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const { first_name = "User", stage = "Title" } =
    session?.user?.user_metadata || {};

  const handleSettingsClick = () => {
    navigate("/settings");
    setIsOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="profile-bar-container">
      <div
        className="profile-bar"
        onClick={() => !isSettingsPage && setIsOpen(!isOpen)}
      >
        <div className="profile-bar__info">
          <UserCircleIcon className="profile-bar__avatar" />
          <div className="profile-bar__text">
            <span className="profile-bar__name">{first_name}</span>
            <span className="profile-bar__title">{stage}</span>
          </div>
        </div>
        {isOpen ? (
          <ChevronDownIcon className="profile-bar__settings" />
        ) : (
          <ChevronUpIcon className="profile-bar__settings" />
        )}
      </div>

      {isOpen && (
        <div className="profile-dropdown">
          <button
            className={`dropdown-item ${isSettingsPage ? "active" : ""}`}
            onClick={handleSettingsClick}
          >
            <Cog6ToothIcon className="dropdown-icon" />
            Settings
          </button>
          <button className="dropdown-item" onClick={handleLogout}>
            <ArrowRightStartOnRectangleIcon className="dropdown-icon" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileBar;
