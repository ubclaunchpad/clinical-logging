import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import "./SignOutButton.css";

export default function SignOutButton() {
  const { logout } = useAuth();

  const handleSignOutClick = async () => {
    try {
      await logout();
    } catch (e) {
      console.log("Failed to logout");
    }
  };

  return (
    <div className="sign-out-button-container">
      <button onClick={handleSignOutClick}>
        Sign Out
        <LogoutIcon className="sign-out-icon" />
      </button>
    </div>
  );
}
