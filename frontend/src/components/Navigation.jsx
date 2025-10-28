import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar japanese-nav">
      <div className="navbar-container">
        <div className="nav-brand"> <Link to="/">ニポンモータース/Nipon Motors</Link> </div>
        
        <div className="nav-links">
          <Link to="/cars" className="cars-link">Cars</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/cars/add" className="add-car-link">Add Car</Link>
              <div className="nav-user">
                <span className="welcome-text"> {user?.username}!</span>
                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;