import React from "react";
import { useNavigate } from "react-router-dom";
import "./CTASection.css";

export default function CTASection({ mainColour }) {
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
}
