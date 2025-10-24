import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="brand-name">Nipon Motors</span>
            </h1>
            <p className="hero-subtitle">
              Discover your perfect ride from Japan's finest selection of premium vehicles
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Premium Cars</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Cities</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
            <div className="hero-actions">
              <Link to="/cars" className="cta-button primary">
                Browse Cars
              </Link>
              <Link to="/login" className="cta-button secondary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-background"></div>
      </section>

      {/* Features section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Nipon Motors?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚗</div>
              <h3>Premium Selection</h3>
              <p>Handpicked vehicles from trusted dealers across Japan, ensuring quality and reliability.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Smart Search</h3>
              <p>Advanced filtering and search capabilities to find your perfect match quickly and easily.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing with transparent costs and no hidden fees. Get the best value for your money.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Trusted Platform</h3>
              <p>Secure transactions and verified dealers. Your peace of mind is our top priority.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Popular Categories</h2>
          <div className="categories-grid">
            <div className="category-card sedan">
              <div className="category-overlay">
                <h3>Sedans</h3>
                <p>Comfort & Elegance</p>
                <Link to="/cars?body_type=sedan" className="category-link">
                  Explore →
                </Link>
              </div>
            </div>
            <div className="category-card suv">
              <div className="category-overlay">
                <h3>SUVs</h3>
                <p>Adventure Ready</p>
                <Link to="/cars?body_type=suv" className="category-link">
                  Explore →
                </Link>
              </div>
            </div>
            <div className="category-card sports">
              <div className="category-overlay">
                <h3>Sports Cars</h3>
                <p>Pure Performance</p>
                <Link to="/cars?category=sports" className="category-link">
                  Explore →
                </Link>
              </div>
            </div>
            <div className="category-card electric">
              <div className="category-overlay">
                <h3>Electric</h3>
                <p>Future Forward</p>
                <Link to="/cars?fuel_type=ELECTRIC" className="category-link">
                  Explore →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Dream Car?</h2>
            <p>Join thousands of satisfied customers who found their perfect vehicle with Nipon Motors</p>
            <Link to="/cars" className="cta-button large">
              Start Your Search
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;