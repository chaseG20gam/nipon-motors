import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(username, password);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      
      <div className="login-content">
        <div className="login-form-wrapper">
          <div className="login-header">
            <div className="login-logo">
              <img src="/nm-logo.png" alt="Nipon Motors" className="logo-image" />
            </div>
            <h2 className="login-title">ログイン - Welcome Back</h2>
            <p className="login-subtitle">Sign in to manage your car listings</p>
          </div>
          
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="Enter your username"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Logging in...
                </>
              ) : (
                <>
                  Login to Nipon Motors
                </>
              )}
            </button>
          </form>
          
          <div className="demo-credentials">
            <div className="demo-header">
              <strong>Admin Credentials</strong>
            </div>
            <div className="demo-info">
              <div className="demo-item">
                <span className="demo-label">Username:</span>
                <span className="demo-value">medjet</span>
              </div>
              <div className="demo-item">
                <span className="demo-label">Password:</span>
                <span className="demo-value">medjet</span>
              </div>
            </div>
          </div>
          
          <div className="login-footer">
            <p>New to Nipon Motors? <span className="signup-link">Contact admin for account</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;