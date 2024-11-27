import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, InputAdornment, Tooltip } from "@mui/material";
import { Article } from "@mui/icons-material";
import Logo from "../assets/images/logo.png";
import "./styles/LogCode.css";

const LogCode = () => {
  const [setLogbookCode] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      return alert("Please accept the terms and conditions");
    }
    try {
      navigate("/home");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="logcode-page">
      <div className="container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>Logbook code entry</h1>
            <h2 className="form-description">
              Please enter in your logbook code in order to finish registering
              your account.
            </h2>

            <div className="code-group">
              <label htmlFor="logbook-code">Logbook code</label>
              <TextField
                id="logbook-code"
                type="text"
                variant="outlined"
                fullWidth
                placeholder="Enter logbook code"
                onChange={(e) => setLogbookCode(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Article />
                    </InputAdornment>
                  ),
                }}
                required
              />
            </div>

            <div className="help-text">
              <Tooltip
                title="Located inside your logbook"
                arrow
                placement="top"
              >
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Where is my code?
                </a>
              </Tooltip>
            </div>

            <div className="terms-group">
              <label className="custom-checkbox-container">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <span className="terms-text">
                  I have read and agree to{" "}
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    FlowLeaflet&apos;s Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <button type="submit" disabled={loading}>
              Continue
            </button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel">
              <img src={Logo} alt="Logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogCode;
