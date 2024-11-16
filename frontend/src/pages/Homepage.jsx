import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const mainColour = "#646cff";

export default function Home() {
  return (
    <div className="home-container">
      <Navbar variant="homepage" />
      <CTASection mainColour={mainColour} />
    </div>
  );
}

function Navbar() {
  return (
    <>
      <div className="navbar">
        <Logo />
        <Buttons />
      </div>
      <div className="divider-line"></div> {/* Divider line */}
    </>
  );
}

function Buttons() {
  const navigate = useNavigate();
  const { logout, session } = useAuth();

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleSignOutClick = async () => {
    try {
      await logout();
    } catch (e) {
      console.log("Failed to logout");
    }
  };

  return (
    <div className="nav-buttons-container">
      {session ? (
        <button onClick={handleSignOutClick}>
          Sign Out
          <LogoutIcon className="login-icon" />
        </button>
      ) : (
        <button onClick={handleSignInClick}>
          Sign In
          <LoginIcon className="login-icon" />
        </button>
      )}
    </div>
  );
}

function Logo() {
  return (
    <div className="logo-text-container">
      <span style={{ color: mainColour }} className="logo-text-bold">
        FlowLeaflets <br />
        <span className="logo-text-small">Clinical Logbooks</span>
      </span>
    </div>
  );
}

function SignUpButton() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="sign-up-button-container">
      <button onClick={handleSignUpClick}>Sign Up</button>
    </div>
  );
}

function CTASection() {
  return (
    <div className="cta-section">
      <h1>
        Welcome to <br />
        <span style={{ color: mainColour }}>FlowLeaflets</span>
      </h1>
      <p className="cta-paragraph">
        Detailed caselogs for patients you see, vital care for those in need,
        globally
      </p>
      <SignUpButton />
    </div>
  );
}
