import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await api.post(endpoint, formData);
      const msg = res.data?.message || '';

      if (isLogin) {
        if (msg === 'Login Successful' || res.data?.username) {
          setMsgType('success');
          setMessage('Login Successful! Redirecting...');
          localStorage.setItem('username', res.data?.username || formData.username);
          setTimeout(() => navigate('/dashboard'), 800);
        } else {
          setMsgType('error');
          setMessage(msg || 'Login failed. Check your credentials.');
        }
      } else {
        setMsgType('success');
        setMessage('Registration Successful! You can now log in.');
        setIsLogin(true);
        setFormData({ username: '', password: '' });
      }
    } catch (error) {
      setMsgType('error');
      const errMsg = error.response?.data?.message || 'Server error. Make sure backend is running on port 8080.';
      setMessage(errMsg);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <div className="auth-logo">🎬</div>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to book your tickets.' : 'Sign up to get started.'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Username or Email</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username or email"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {isLogin && (
          <div className="demo-hint">
            Demo: username <strong>admin</strong> / password <strong>admin123</strong>
          </div>
        )}

        {message && (
          <div className={`auth-message ${msgType}`}>{message}</div>
        )}

        <div className="auth-toggle">
          <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
          <button
            type="button"
            onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
            className="toggle-btn"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
