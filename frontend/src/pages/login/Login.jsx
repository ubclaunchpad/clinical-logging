import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import {
  AccountCircle,
  Lock,
  Email,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Logo from "../../assets/images/logo.png";
import "./Login.css";
import { CLButtonPrimary } from "../../components/Buttons/CLButtons";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

/** Reusable Password Field Component */
const PasswordField = ({
  id,
  placeholder,
  value,
  onChange,
  showPassword,
  toggleShowPassword,
}) => (
  <TextField
    id={id}
    type={showPassword ? "text" : "password"}
    variant="outlined"
    fullWidth
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Lock />
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={toggleShowPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
    required
  />
);

const Login = () => {
  /** State variables for sign-in form */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginShowPassword, setLoginShowPassword] = useState(false);

  /** State variables for sign-up form */
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupShowPassword, setSignupShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [institution, setInstitution] = useState("");
  const [stage, setStage] = useState("");

  /** General state variables */
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const navigate = useNavigate();
  const { session, login, register } = useAuth();
  const selectRef = useRef(null);

  /** Navigate to home if session exists */
  useEffect(() => {
    if (session) {
      navigate("/home");
    }
  }, [session, navigate]);

  /** Handle click outside of custom select to close it */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /** Sign-up form submission handler */
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!checkValidEmail(signupEmail)) {
      return alert("Please enter a valid email");
    }

    try {
      setLoading(true);
      await register(
        firstName,
        lastName,
        signupEmail,
        signupPassword,
        institution,
        stage
      );
      navigate("/logcode");
    } catch (error) {
      if (error.code === "weak_password") {
        alert(
          "Password must contain:\n" +
            "- At least 8 characters\n" +
            "- At least one uppercase letter\n" +
            "- At least one lowercase letter\n" +
            "- At least one number\n" +
            "- At least one special character (e.g., !@#$%^&*()_+-=[]{};:'\"|<>?,./`~)"
        );
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  /** Sign-in form submission handler */
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(loginEmail, loginPassword);
      navigate("/home");
    } catch {
      alert("Failed to login: Email or Password Incorrect");
    } finally {
      setLoading(false);
    }
  };

  /** Email validation function */
  function checkValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <div>
      <div
        className={`container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="container"
      >
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1>Welcome to Flow Leaflets!</h1>
            <h2>Register your account</h2>

            <div className="name-group">
              <div>
                <label htmlFor="first-name">First Name*</label>
                <input
                  id="first-name"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="last-name">Last Name*</label>
                <input
                  id="last-name"
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="email-group">
              <label htmlFor="signup-email">Email*</label>
              <TextField
                id="signup-email"
                type="email"
                variant="outlined"
                fullWidth
                placeholder="Enter your email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                required
              />
            </div>

            <div className="password-group">
              <label htmlFor="signup-password">Password*</label>
              <PasswordField
                id="signup-password"
                placeholder="Enter password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                showPassword={signupShowPassword}
                toggleShowPassword={() =>
                  setSignupShowPassword(!signupShowPassword)
                }
              />
            </div>

            <div className="institution-training-container">
              <div className="institution-training-group">
                <label htmlFor="institution">Institution*</label>
                <TextField
                  id="institution"
                  type="text"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter institution"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  required
                />
              </div>
              <div className="institution-training-group">
                <label htmlFor="stage">Stage of training*</label>
                <div className="custom-select-container" ref={selectRef}>
                  <div
                    className="custom-select"
                    data-empty={!stage}
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                  >
                    {stage || "Select"}
                    <span className="custom-select-arrow">
                      {isSelectOpen ? (
                        <ChevronUpIcon className="w-5 h-5" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5" />
                      )}
                    </span>
                  </div>
                  <div
                    className={`custom-select-options ${
                      isSelectOpen ? "open" : ""
                    }`}
                  >
                    {[
                      "Medical student",
                      "Resident",
                      "Fellow",
                      "Attending",
                      "Other",
                    ].map((option) => (
                      <div
                        key={option}
                        className="custom-select-option"
                        onClick={() => {
                          setStage(option);
                          setIsSelectOpen(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <CLButtonPrimary type="submit" disabled={loading} width={"60%"}>
              Continue
            </CLButtonPrimary>

            <div className="signup-link">
              <span>Already have an account? </span>
              <Link to="#" onClick={() => setIsRightPanelActive(false)}>
                Login
              </Link>
            </div>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignIn}>
            <h1>Welcome Back</h1>
            <h2>Login to your account</h2>
            <div className="username-group">
              <label htmlFor="login-email">Username</label>
              <TextField
                id="login-email"
                type="email"
                variant="outlined"
                fullWidth
                placeholder="Enter username"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                required
              />
            </div>
            <div className="password-group">
              <label htmlFor="login-password">Password</label>
              <PasswordField
                id="login-password"
                placeholder="Enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                showPassword={loginShowPassword}
                toggleShowPassword={() =>
                  setLoginShowPassword(!loginShowPassword)
                }
              />
            </div>
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <CLButtonPrimary type="submit" disabled={loading} width={"60%"}>
              Login
            </CLButtonPrimary>
            <div className="signup-link">
              <span>Don’t have an account? </span>
              <Link to="#" onClick={() => setIsRightPanelActive(true)}>
                Sign up
              </Link>
            </div>
          </form>
        </div>

        {/* Overlay Panels */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <img src={Logo} alt="Logo" />
            </div>
            <div className="overlay-panel overlay-right">
              <img src={Logo} alt="Logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
