import React from "react";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import "./SignInButton.css";

export default function SignInButton() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login");
  };

  return (
    <div className="sign-in-button-container">
      <button onClick={handleSignInClick}>
        Sign In
        <LoginIcon className="login-icon" />
      </button>
    </div>
  );
}
