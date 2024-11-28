import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo-small.png";
import { TextField, InputAdornment } from "@mui/material";
import {
  UserCircleIcon,
  BellIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import "./TopNav.css";

function TopNav() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      <Link to="/" className="logo-link">
        <img src={Logo} alt="FlowLeaflets Logo" className="nav-logo" />
      </Link>
      <nav className="top-nav">
        <div className="nav-left">
          <TextField
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifyingGlassIcon className="icon search-input" />
                </InputAdornment>
              ),
            }}
          />
          <button className="filter-btn">
            <AdjustmentsHorizontalIcon className="icon" /> Filter
          </button>
        </div>
        <div className="nav-right">
          <button className="notification-btn">
            <BellIcon className="icon" />
          </button>
          <button className="profile-btn">
            <UserCircleIcon className="icon" />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default TopNav;
