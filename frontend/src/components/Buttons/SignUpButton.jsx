import { useNavigate } from "react-router-dom";
import "./SignUpButton.css";

export default function SignUpButton() {
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