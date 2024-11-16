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

// function Buttons() {
//   const navigate = useNavigate();
//   const { logout, session } = useAuth();

//   const handleSignInClick = () => {
//     navigate("/login");
//   };

//   const handleSignOutClick = async () => {
//     try {
//       await logout();
//     } catch (e) {
//       console.log("Failed to logout");
//     }
//   };

//   return (
//     <div className="nav-buttons-container">
//       {session ? (
//         <button onClick={handleSignOutClick}>
//           Sign Out
//           <LogoutIcon className="login-icon" />
//         </button>
//       ) : (
//         <button onClick={handleSignInClick}>
//           Sign In
//           <LoginIcon className="login-icon" />
//         </button>
//       )}
//     </div>
//   );
// }
