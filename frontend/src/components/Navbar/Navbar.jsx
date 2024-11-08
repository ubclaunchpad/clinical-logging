import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import LoginIcon from "@mui/icons-material/Login";
import HomeButton from "../Buttons/HomeButton";
import CreateNewLogButton from "../Buttons/CreateNewLogButton";
import LogHistoryButton from "../Buttons/LogHistoryButton";
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
          <HomeButton />
          <CreateNewLogButton variant="navbar" />
          <LogHistoryButton variant="navbar" />
        </>
      )}
    </div>
  );
}
