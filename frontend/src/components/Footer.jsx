import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Nipon Motors</h3>
          <p className="footer-tagline">日本のモーター / Japanese Motors</p>
        </div>
        
        <div className="footer-section">
          <h4>Debug Links</h4>
          <div className="footer-links">
            <Link to="/404" className="footer-link">404 Page</Link>
            <Link to="/500" className="footer-link">500 Page</Link>
          </div>
        </div>
        
        <div className="footer-section">
          <p className="footer-copyright">
            © 2024 Nipon Motors. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
