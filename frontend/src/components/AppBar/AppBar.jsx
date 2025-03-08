import {
  AdjustmentsHorizontalIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import "./AppBar.css"
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const AppBar = () => {
  const location = useLocation();
  const { session } = useAuth();

  return (
    <div className="app-bar">
      { location.pathname !== "/home" ? 
        (
          <div className="icon-search-filter-container">
            <div className="search-filter-container">
              <input type="text" className="search-input" name="search" placeholder="Search Logs..." />
              <button className="app-bar-filter-button">
                <AdjustmentsHorizontalIcon className="app-bar-icon" />
                <p>Filter</p>
              </button>
            </div>
          </div>
        ) : (
          <WelcomeSection
            firstName={session?.user?.user_metadata?.first_name || "User"}
          />
        )}
      <div>
      <div className="small-icon-buttons-container">
        <button className="small-icon-button">
          <BellIcon className="app-bar-icon" />
        </button>
      </div>
      </div>
    </div>
  )
}

function WelcomeSection({ firstName }) {
  return (
    <div className="welcome-section">
      <h1>
        <span className="welcome-text">Welcome back, </span>
        <span className="user-name">{firstName}</span>
      </h1>
    </div>
  );
}