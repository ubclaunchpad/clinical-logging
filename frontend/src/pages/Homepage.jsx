import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";

const mainColour = "#646cff";

export default function Home() {
  return (
    <div>
      <Navbar />
      <CTASection />
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

  const handleSignInClick = () => {
    navigate("/login"); 
  };

  return (
    <div className = "nav-buttons-container">
      <button onClick={handleSignInClick}>
        Sign In 
        <LoginIcon className="login-icon" />
      </button>
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
      <button onClick={handleSignUpClick}>
        Sign Up
      </button>
    </div>
  );
}

function CTASection() {
  return (
    <div className="cta-section">
      <h1>
        Welcome to <br />
        <span style={{ color: mainColour }}> FlowLeaflets</span>
      </h1>
      <p className="cta-paragraph">
        Detailed caselogs for patients you see, vital care for those in need, globally
      </p>

      <SignUpButton />
    </div>
  );
}