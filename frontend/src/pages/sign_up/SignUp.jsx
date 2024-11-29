import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { session, register } = useAuth();

  useEffect(() => {
    if (session) {
      navigate("/homepage");
    }
  }, [session, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!checkValidEmail(email)) {
      return alert("Please enter a valid email");
    } else if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);
      await register(firstName, lastName, email, password);
      navigate("/homepage");
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
    }
    setLoading(false);
  }

  return (
    <div>
      <h2>Register your account</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first-name">First Name:</label>
        <input
          id="first-name"
          name="first-name"
          type="text"
          autoComplete="given-name"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label htmlFor="last-name">Last Name:</label>
        <input
          id="last-name"
          name="last-name"
          type="text"
          autoComplete="family-name"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label htmlFor="email">Email Address:</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          Register Account
        </button>
      </form>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}

function checkValidEmail(email) {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}
