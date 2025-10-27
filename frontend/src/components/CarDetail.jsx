import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { carsAPI } from '../services/api';
import './CarDetail.css';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCarDetail();
  }, [id]);

  const fetchCarDetail = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await carsAPI.getCarById(id);
      setCar(data);
    } catch (err) {
      console.error('Error fetching car details:', err);
      setError('Failed to load car details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="car-detail-container">
        <div className="car-detail-content">
          <div className="loading">Loading car details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="car-detail-container">
        <div className="car-detail-content">
          <div className="error-message">{error}</div>
          <button onClick={() => navigate('/cars')} className="back-btn">
            Back to Cars
          </button>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="car-detail-container">
        <div className="car-detail-content">
          <div className="error-message">Car not found.</div>
          <button onClick={() => navigate('/cars')} className="back-btn">
            Back to Cars
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="car-detail-container">
      <div className="car-detail-content">
        {/* nav */}
      <div className="car-detail-nav">
        <Link to="/cars" className="back-link">
          ← Back to Cars
        </Link>
      </div>

      {/* car header */}
      <div className="car-header">
        <div className="car-title-section">
          <h1>{car.brand} {car.model}</h1>
          {car.title && <p className="car-subtitle">{car.title}</p>}
          <div className="car-badges">
            <span className="year-badge">{car.year}</span>
            <span className="fuel-badge">{car.fuel_type}</span>
          </div>
        </div>
        <div className="car-price-section">
          <div className="car-price-large">{formatPrice(car.price)}</div>
        </div>
      </div>

      {/* car image */}
      {car.image && (
        <div className="car-image-section">
          <img 
            src={car.image.startsWith('http') ? car.image : `http://localhost:8000${car.image}`} 
            alt={`${car.brand} ${car.model}`}
            className="car-detail-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* car details grid */}
      <div className="car-details-grid">
        {/* regular info cards row */}
        <div className="info-cards-row">
          {/* basic info */}
          <div className="detail-card">
            <h3>Vehicle Information</h3>
            <div className="detail-row">
              <span className="detail-label">Brand:</span>
              <span className="detail-value">{car.brand}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Model:</span>
              <span className="detail-value">{car.model}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Year:</span>
              <span className="detail-value">{car.year}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Mileage:</span>
              <span className="detail-value">{car.mileage?.toLocaleString()} km</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Fuel Type:</span>
              <span className="detail-value">{car.fuel_type}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Prefecture:</span>
              <span className="detail-value">{car.prefecture}</span>
            </div>
          </div>

          {/* owner info */}
          {car.owner && (
            <div className="detail-card">
              <h3>Owner Information</h3>
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{car.owner.name}</span>
              </div>
              {car.owner.email && (
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">
                    <a href={`mailto:${car.owner.email}`}>{car.owner.email}</a>
                  </span>
                </div>
              )}
            </div>
          )}

          {/* info list */}
          <div className="detail-card">
            <h3>Listing Information</h3>
            <div className="detail-row">
              <span className="detail-label">Listed on:</span>
              <span className="detail-value">{formatDate(car.created_at)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Last updated:</span>
              <span className="detail-value">{formatDate(car.updated_at)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Car ID:</span>
              <span className="detail-value">#{car.id}</span>
            </div>
          </div>
        </div>

        {/* features */}
        {car.features && car.features.length > 0 && (
          <div className="detail-card features-card">
            <h3>Features & Equipment</h3>
            <div className="features-grid">
              {car.features.map((feature) => (
                <div key={feature.id} className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span className="feature-name">{feature.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* buttons */}
      <div className="car-actions">
        <button className="contact-btn">Contact Owner</button>
        <button className="save-btn">Save to Favorites</button>
        <button className="share-btn">Share Listing</button>
      </div>

      {/* similar cars section (test) */}
      <div className="similar-cars-section">
        <h3>You might also like</h3>
        <p className="similar-cars-placeholder">
          Similar cars from {car.brand} • Similar price range • Same fuel type
        </p>
        <Link to="/cars" className="browse-more-link">
          Browse all cars →
        </Link>
      </div>
      </div>
    </div>
  );
};

export default CarDetail;