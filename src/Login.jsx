import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        try {
    const response = await axios.post('http://localhost:3000/users/login', {
      email: email,
      password: pass
    });
    console.log(response.data);
    navigate(`home/${response.data}`)
  } catch (error) {
    console.error(error);
  }
        
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}