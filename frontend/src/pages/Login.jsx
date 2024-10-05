import React from 'react'
import { Link } from "react-router-dom"
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //Auth Context
	const { currentUser, login } = useAuth();

    //redirect to homepage when already authenticated
	useEffect(() => {
    if (currentUser) {
      //set to homepage
      navigate("/");
    }
	}, [currentUser]);

	async function handleSubmit (e) {
		e.preventDefault();
		
    try {
      //disable submit button
      setLoading(true);
      await login(email, password);
      //TODO dashboard page protected routes
      navigate("/dashboard");
    } catch (e) {
      //TODO catch error
      alert("Failed to login");
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
        <button type='submit' disabled={loading}>Login</button>
      </form>
      <Link to="/register">Don't have an Account? Register</Link>
    </div> 
  )
}
