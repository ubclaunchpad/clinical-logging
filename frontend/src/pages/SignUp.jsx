import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { session, register } = useAuth();

	useEffect(() => {
		if (session) {
			navigate("/dashboard");
		}
	}, [session]);

	async function handleSubmit(e) {
		e.preventDefault();

		if (!checkValidEmail(email)) {
			return alert("Please enter a valid email");
		} else if (password !== confirmPassword) {
			return alert("Passwords do not match");
		}

		try {
			setLoading(true);
			await register(email, password);
			navigate("/dashboard");
		} catch (error) {
			alert(error.message);
		}
		setLoading(false);
	}

	return (
		<div>
			<h2>Register your account</h2>
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
	const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return emailRegex.test(email);
}
