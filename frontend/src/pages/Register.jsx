import React from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
  //Auth Context
	const { currentUser, register } = useAuth();

  //redirect to homepage when already authenticated
	useEffect(() => {
    if (currentUser) {
      //set to homepage
      navigate("/");
    }
	}, [currentUser]);

	async function handleSubmit (e) {
		e.preventDefault();
		// Validate passwords
    if (password !== confirmPassword) {
      //TODO manage error
      return alert("Passwords do not match");
		}

    try {
      //disable submit button
      setLoading(true);
      await register(email, password);
      //TODO dashboard page protected routes
      navigate("/dashboard");
    } catch (e) {
      //TODO catch error
      alert("Failed to register");
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
					placeholder='Email Address'
					onChange={(e) => setEmail(e.target.value)} 
					required
				/>
				<label htmlFor="password">Password:</label>
				<input 
					id="password" 
					name="password" 
					type="password"
					placeholder='Password'
					onChange={(e) => setPassword(e.target.value)}  
					required
				/>
				<label htmlFor="confirm-password">Confirm Password:</label>
				<input 
					id="confirm-password" 
					name="confirm-password" 
					type="password"
					placeholder='Confirm Password'
					onChange={(e) => setConfirmPassword(e.target.value)}  
					required
				/>
				<button type='submit' disabled={loading}>Register Account</button>
			</form>
			<Link to="/login">Already have an account? Login</Link>
    </div> 
  )
}
