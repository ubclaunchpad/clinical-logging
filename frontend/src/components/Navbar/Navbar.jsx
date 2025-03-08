import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../assets/flow-leaflets-logo.svg";
import {
  HomeIcon,
  BookOpenIcon,
  FolderIcon,
  UserIcon,
  ChevronUpIcon
} from "@heroicons/react/24/outline";
import "./Navbar.css";

export const Navbar = () => {

  const { session } = useAuth();

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
            <p className="nav-button-text">Logs</p>
        </NavLink>
        <NavLink className="nav-button" to="/history">
            <FolderIcon className="nav-icon" />
            <p className="nav-button-text">Saved Logs</p>
        </NavLink>
      </div>
      <div className="profile-container">
        <UserIcon className="profile-icon"/>
        <div className="profile-name-container">
          <h2 className="profile-name-text">{session?.user?.user_metadata?.first_name}</h2>
          <p className="profile-title-text">Title</p>
        </div>
        <button className="expand-button">
          <ChevronUpIcon className="expand-icon"/>
        </button>
      </div>
    </nav>
  );
};
