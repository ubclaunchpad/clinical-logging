import React from 'react'
import { Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit (e) {
		e.preventDefault();
		//TODO login account function
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
          required
        />
        <label htmlFor="password">Password:</label>
        <input 
          id="password" 
          name="password" 
          type="password"
          placeholder='Password' 
          required
        />
        <button type='submit'>Login</button>
      </form>
      <Link to="/register">Don't have an Account? Register</Link>
    </div> 
  )
}
