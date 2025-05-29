import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import OlxLogo from '../../assets/OlxLogo'
import './Login.css'
import axios from 'axios';

function Login() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '', password: ''
  })
  const [error, setError] = useState({
    email: '', password: ''
  })
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser(prev => ({...prev, [name]: value}))
    setError(prev => ({...prev, [name]: ''}))
  }
  
  const validate = () => {
    let isValid = true;
    const newErrors = {email: '', password: ''}
    if(!user.email.trim()) {
      newErrors.email = 'Email required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }
    if (!user.password.trim()) {
      newErrors.password = 'Password is required.';
      isValid = false;
    }
    setError(newErrors);
    return isValid;
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!validate()) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, 
        user, {
        headers: {'Content-type': 'application/json'},
      })
      if(res.data.success) {
        login(res.data.data);
        navigate('/');
      } else {
        setError(prev => ({...prev, form: res.data.message || 'Login failed'}));
      }
    } catch(err) {
      const errorMessage = err.response?.data?.message || 
                        err.message || 
                        'Login failed. Please try again.';
      setError(prev => ({...prev, form: errorMessage}));
    }
  }

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="header-content">
          <div className="logo-section" onClick={() => navigate('/')}>
            <div className="header-logo">
              <OlxLogo onClick={() => navigate('/')} />
            </div>
          </div>
        </div>
      </div>

      <div className="login-main">
        <div className="login-card">
          <div className="login-form-container">
            
            
            <h1 className="login-title">Welcome back</h1>
            <p className="login-subtitle">Login to your account</p>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <input
                  className={`form-input ${error.email ? 'error-input' : ''}`}
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
                {error.email && <span className="error-text">{error.email}</span>}
              </div>

              <div className="form-group">
                <input
                  className={`form-input ${error.password ? 'error-input' : ''}`}
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
                {error.password && <span className="error-text">{error.password}</span>}
              </div>

              <button type="submit" className="login-button">
                Login
              </button>
            </form>

            <div className="login-footer">
              <p className="signup-text">
                Don't have an account? 
                <span className="signup-link" onClick={() => navigate('/signup')}>
                  Sign up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;