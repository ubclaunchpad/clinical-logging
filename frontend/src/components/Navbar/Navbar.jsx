// import Logo from "../Logo/Logo";
// import HomeButton from "../Buttons/HomeButton";
// import SignInButton from "../Buttons/SignInButton";
// import { useAuth } from "../../contexts/AuthContext";
import "./Navbar.css";
import {
  HomeIcon,
  BookOpenIcon,
  ClockIcon,
  ArrowLeftStartOnRectangleIcon
} from '@heroicons/react/24/outline';
// import SignOutButton from "../Buttons/SignOutButton";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-button-container">
        <button className="nav-button">
          <div className="nav-button-icon-container-selected">
            <HomeIcon className="icon"/>
          </div>
          <p className="nav-button-text-selected">Home</p>
        </button>
        <button className="nav-button">
          <div className="nav-button-icon-container">
            <BookOpenIcon className="icon"/>
          </div>
          <p className="nav-button-text">Logs</p>
        </button>
        <button className="nav-button">
          <div className="nav-button-icon-container">
            <ClockIcon className="icon"/>
          </div>
          <p className="nav-button-text">History</p>
        </button>
      </div>
      <button className="logout-button">
        <ArrowLeftStartOnRectangleIcon className="icon"/>
      </button>
    </div>
  );
}
