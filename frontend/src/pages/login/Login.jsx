import React, { useState, useEffect } from "react";
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
import "../styles/Login.css";

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { session, login, register } = useAuth();

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  const getFirstAndLastName = (fullName) => {
    const names = fullName.trim().split(" ");
    return {
      firstName: names[0] || "",
      lastName: names.slice(1).join(" ") || "",
    };
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!checkValidEmail(email)) {
      return alert("Please enter a valid email");
    }

    const { firstName, lastName } = getFirstAndLastName(name);

    try {
      setLoading(true);
      await register(firstName, lastName, email, password);
      setIsRightPanelActive(false);
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch {
      alert("Failed to login: Email or Password Incorrect");
    } finally {
      setLoading(false);
    }
  };

  function checkValidEmail(email) {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
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
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1>Welcome to Flow Leaflets!</h1>
            <h2>Register your account</h2>

            <div className="username-group">
              <label htmlFor="name">Full Name</label>
              <TextField
                id="name"
                type="text"
                variant="outlined"
                fullWidth
                placeholder="Enter your full name"
                onChange={(e) => setName(e.target.value)}
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

            <div className="email-group">
              <label htmlFor="signup-email">Email</label>
              <TextField
                id="signup-email"
                type="email"
                variant="outlined"
                fullWidth
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
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
              <label htmlFor="signup-password">Password</label>
              <TextField
                id="signup-password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
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
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              Continue
            </button>

            <div className="signup-link">
              <span>Already have an account? </span>
              <Link to="#" onClick={() => setIsRightPanelActive(false)}>
                Sign in
              </Link>
            </div>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignIn}>
            <h1>Welcome Back</h1>
            <h2>Login to your account</h2>
            <div className="username-group">
              <label htmlFor="email">Username</label>
              <TextField
                id="email"
                type="email"
                variant="outlined"
                fullWidth
                placeholder="Enter username"
                onChange={(e) => setEmail(e.target.value)}
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
              <label htmlFor="password">Password</label>
              <TextField
                id="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
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
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
            </div>
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading}>
              Login
            </button>
            <div className="signup-link">
              <span>Don’t have an account? </span>
              <Link to="#" onClick={() => setIsRightPanelActive(true)}>
                Sign up
              </Link>
            </div>
          </form>
        </div>
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
