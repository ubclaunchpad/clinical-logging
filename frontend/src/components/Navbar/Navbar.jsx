// import HomeButton from "../Buttons/HomeButton";
// import SignInButton from "../Buttons/SignInButton";
// import SignOutButton from "../Buttons/SignOutButton";
// import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  BookOpenIcon,
  ClockIcon,
  ArrowLeftStartOnRectangleIcon
} from '@heroicons/react/24/outline';
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-button-container">
        <NavLink className="nav-button" to="/dashboard">
          <div className="nav-button-icon-container">
            <HomeIcon className="nav-icon"/>
          </div>
          <p className="nav-button-text">Home</p>
        </NavLink>
        <NavLink className="nav-button" to="/newLog">
          <div className="nav-button-icon-container">
            <BookOpenIcon className="nav-icon"/>
          </div>
          <p className="nav-button-text">Logs</p>
        </NavLink>
        <NavLink className="nav-button" to="/logHistory">
          <div className="nav-button-icon-container">
            <ClockIcon className="nav-icon"/>
          </div>
          <p className="nav-button-text">History</p>
        </NavLink>
      </div>
      <button className="logout-button">
        <ArrowLeftStartOnRectangleIcon className="nav-icon"/>
      </button>
    </nav>
  );
}
