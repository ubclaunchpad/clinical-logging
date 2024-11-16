import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { session, login } = useAuth();

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch {
      alert("Failed to login: Email or Password Incorrect");
    }
    setLoading(false);
  }

  return (
    <div>
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
      <Link to="/sign-up">Don&apos;t have an Account? Register</Link>
    </div>
  );
}
