import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import LoginIcon from "@mui/icons-material/Login";
import "./Navbar.css";

export default function Navbar({ variant }) {
  return (
    <div>
      <NavbarComponent variant={variant} />
    </div>
  );
}

function NavbarComponent({ variant }) {
  return (
    <div className="navbar">
      <Logo />
      <NavButtons variant={variant} />
    </div>
  );
}

function NavButtons({ variant }) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  const handleNewLog = () => {
    navigate("/newLog");
  };

  const handleLogHistory = () => {
    navigate("/logHistory");
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  return (
    <div className="nav-buttons-container">
      {variant === "homepage" ? (
        <button onClick={handleSignInClick}>
          Sign In
          <LoginIcon className="login-icon" />
        </button>
      ) : (
        <>
          <button onClick={handleHomeClick}>Home</button>
          <button onClick={handleNewLog}>New Log</button>
          <button onClick={handleLogHistory}>Log History</button>
        </>
      )}
    </div>
  );
}
