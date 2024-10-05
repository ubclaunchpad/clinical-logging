import React from 'react'
import { Link } from "react-router-dom"
import { useState } from 'react'

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	async function handleSubmit (e) {
		e.preventDefault();
		// Validate passwords
    if (password !== confirmPassword) {
      //TODO function for incorrectPassword
      return;
		}

		//TODO register account function
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
				<button type='submit'>Register Account</button>
			</form>
			<Link to="/login">Already have an account? Login</Link>
    </div> 
  )
}
