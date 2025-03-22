import { NavLink } from "react-router-dom";
import Logo from "../../assets/flow-leaflets-logo.svg";
import ProfileBar from "./ProfileBar";
import {
  HomeIcon,
  BookOpenIcon,
  FolderIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-logo-container">
        <img src={Logo} className="nav-logo" />
        <h1 className="nav-name">FlowLeaflets</h1>
      </div>
      <div className="nav-button-container">
        <NavLink className="nav-button" to="/home">
          <HomeIcon className="nav-icon" />
          <p className="nav-button-text">Home</p>
        </NavLink>
        <NavLink className="nav-button" to="/logbooks">
          <BookOpenIcon className="nav-icon" />
          <p className="nav-button-text">Logbooks</p>
        </NavLink>
        <NavLink className="nav-button" to="/history">
          <FolderIcon className="nav-icon" />
          <p className="nav-button-text">All Logs</p>
        </NavLink>
        <NavLink className="nav-button" to="/recent-activity">
          <ClockIcon className="nav-icon" />
          <p className="nav-button-text">Recent Activity</p>
        </NavLink>
      </div>
      <div className="profile-container">
        <ProfileBar />
      </div>
    </nav>
  );
};
