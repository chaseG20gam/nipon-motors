import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Nipon Motors</Link>
      </div>
      
      <div className="nav-links">
        <Link to="/cars">Cars</Link>
        
        {isAuthenticated ? (
          <div className="nav-user">
            <span>Welcome, {user?.username}!</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;