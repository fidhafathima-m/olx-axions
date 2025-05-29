import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import OlxLogo from '../../assets/OlxLogo';
import './Signup.css';
import axios from 'axios';

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    name: '', email: '', phone: '', password: ''
  });

  const [errors, setErrors] = useState({
    name: '', email: '', phone: '', password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setSignup(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
  let isValid = true;
  const tempErrors = { name: '', email: '', phone: '', password: '' };

  if (!signup.name.trim()) {
    tempErrors.name = 'Name is required.';
    isValid = false;
  } else if (signup.name.trim().length < 2) {
    tempErrors.name = 'Name must be at least 2 characters.';
    isValid = false;
  } else if (signup.name.trim().length > 50) {
    tempErrors.name = 'Name cannot exceed 50 characters.';
    isValid = false;
  } else if (!/^[a-zA-Z\s'-]+$/.test(signup.name)) {
    tempErrors.name = 'Name contains invalid characters.';
    isValid = false;
  }

  if (!signup.email.trim()) {
    tempErrors.email = 'Email is required.';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signup.email)) {
    tempErrors.email = 'Invalid email format.';
    isValid = false;
  } else if (signup.email.length > 100) {
    tempErrors.email = 'Email cannot exceed 100 characters.';
    isValid = false;
  } else if (/\.{2,}/.test(signup.email)) {
    tempErrors.email = 'Email contains consecutive dots.';
    isValid = false;
  }

  if (!signup.phone.trim()) {
    tempErrors.phone = 'Phone number is required.';
    isValid = false;
  } else if (!/^\d{10}$/.test(signup.phone)) {
    tempErrors.phone = 'Phone must be exactly 10 digits.';
    isValid = false;
  } else if (/^(\d)\1{9}$/.test(signup.phone)) {
    tempErrors.phone = 'Phone number cannot be all the same digit.';
    isValid = false;
  } else if (!/^[6-9]\d{9}$/.test(signup.phone)) {
    tempErrors.phone = 'Phone number must start with 6-9.';
    isValid = false;
  }

  if (!signup.password) {
    tempErrors.password = 'Password is required.';
    isValid = false;
  } else if (signup.password.length < 8) {
    tempErrors.password = 'Password must be at least 8 characters.';
    isValid = false;
  } else if (signup.password.length > 30) {
    tempErrors.password = 'Password cannot exceed 30 characters.';
    isValid = false;
  } else if (!/[A-Z]/.test(signup.password)) {
    tempErrors.password = 'Password must contain at least one uppercase letter.';
    isValid = false;
  } else if (!/[a-z]/.test(signup.password)) {
    tempErrors.password = 'Password must contain at least one lowercase letter.';
    isValid = false;
  } else if (!/\d/.test(signup.password)) {
    tempErrors.password = 'Password must contain at least one number.';
    isValid = false;
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(signup.password)) {
    tempErrors.password = 'Password must contain at least one special character.';
    isValid = false;
  } else if (/(.)\1{2,}/.test(signup.password)) {
    tempErrors.password = 'Password cannot contain repeating characters (more than 2).';
    isValid = false;
  } 

  setErrors(tempErrors);
  return isValid;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/signup`, 
        signup, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.data.success) {
        login(res.data.data);
        navigate('/');
      } else {
        setErrors(prev => ({ ...prev, form: res.data.message || 'Signup failed' }));
      }
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      if (error.response?.status === 406 && serverMessage?.toLowerCase().includes('email')) {
        setErrors(prev => ({ ...prev, email: serverMessage }));
      } else {
        setErrors(prev => ({ 
          ...prev, 
          form: serverMessage || error.message || 'Signup failed. Please try again.' 
        }));
      } 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="header-content">
          <div className="logo-section" onClick={() => navigate('/')}>
            <div className="header-logo">
              <OlxLogo />
            </div>
          </div>
        </div>
      </div>

      <div className="login-main">
        <div className="login-card">
          <div className="login-form-container">
            <h1 className="login-title">Create Account</h1>
            <p className="login-subtitle">Sign up to get started</p>

            <form onSubmit={handleSubmit} className="login-form">
              {['name', 'email', 'phone', 'password'].map(field => (
                <div className="form-group" key={field}>
                  <input
                    className={`form-input ${errors[field] ? 'error-input' : ''}`}
                    type={field === 'password' ? 'password' : (field === 'email' ? 'email' : 'text')}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={signup[field]}
                    onChange={handleChanges}
                  />
                  {errors[field] && <span className="error-text">{errors[field]}</span>}
                </div>
              ))}

              <button 
                type="submit" 
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <div className="login-footer">
              <p className="signup-text">
                Already have an account?{' '}
                <span className="signup-link" onClick={() => navigate('/login')}>
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
