import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { carsAPI } from '../services/api';
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    fuel_type: '',
    prefecture: '',
  });

  // fetch cars
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async (params = {}) => {
    try {
      setLoading(true);
      setError('');
      
      // filters and search
      const searchParams = {
        ...params,
        ...filters,
      };
      
      if (searchTerm) {
        searchParams.search = searchTerm;
      }
      
      const data = await carsAPI.getAllCars(searchParams);
      setCars(data.results || data); //pagination
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError('Failed to load cars. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCars();
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // auto-search when filters change
    fetchCars(newFilters);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (loading) {
    return <div className="loading">Loading cars...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="car-list-container">
      <div className="car-list-header">
        <h1>Available Cars</h1>
        <p>Found {cars.length} cars</p>
      </div>

      {/* search and filters */}
      <div className="search-filters">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by brand, model, or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>

        <div className="filters">
          <select
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            className="filter-select"
          >
            <option value="">All Brands</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Nissan">Nissan</option>
            <option value="Mazda">Mazda</option>
            <option value="Subaru">Subaru</option>
          </select>

          <select
            value={filters.fuel_type}
            onChange={(e) => handleFilterChange('fuel_type', e.target.value)}
            className="filter-select"
          >
            <option value="">All Fuel Types</option>
            <option value="PETROL">Petrol</option>
            <option value="DIESEL">Diesel</option>
            <option value="ELECTRIC">Electric</option>
            <option value="HYBRID">Hybrid</option>
          </select>

          <select
            value={filters.prefecture}
            onChange={(e) => handleFilterChange('prefecture', e.target.value)}
            className="filter-select"
          >
            <option value="">All Prefectures</option>
            <option value="Tokyo">Tokyo</option>
            <option value="Osaka">Osaka</option>
            <option value="Kyoto">Kyoto</option>
            <option value="Hokkaido">Hokkaido</option>
            <option value="Fukuoka">Fukuoka</option>
          </select>
        </div>
      </div>

      {/* car grid */}
      <div className="car-grid">
        {cars.length === 0 ? (
          <p className="no-cars">No cars found matching your criteria.</p>
        ) : (
          cars.map((car) => (
            <div key={car.id} className="car-card">
              <div className="car-card-header">
                <h3>{car.brand} {car.model}</h3>
                <span className="car-year">{car.year}</span>
              </div>
              
              {car.image && (
                <div className="car-image-container">
                  <img 
                    src={car.image.startsWith('http') ? car.image : `http://localhost:8000${car.image}`} 
                    alt={`${car.brand} ${car.model}`}
                    className="car-image"
                    onLoad={() => console.log(`Image loaded for ${car.brand} ${car.model}: ${car.image}`)}
                    onError={(e) => {
                      console.log(`Image failed to load for ${car.brand} ${car.model}: ${car.image}`);
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className="car-details">
                <div className="car-info-row">
                  <span className="car-price">{formatPrice(car.price)}</span>
                  <span className="car-mileage">{car.mileage?.toLocaleString()} km</span>
                </div>
                
                <div className="car-info-row">
                  <span className="car-fuel">{car.fuel_type}</span>
                  <span className="car-location">{car.prefecture}</span>
                </div>

                {car.owner && (
                  <div className="car-owner">
                    <small>Owner: {car.owner.name}</small>
                  </div>
                )}

                {car.features && car.features.length > 0 && (
                  <div className="car-features">
                    <small>Features:</small>
                    <div className="feature-tags">
                      {car.features.slice(0, 3).map((feature) => (
                        <span key={feature.id} className="feature-tag">
                          {feature.name}
                        </span>
                      ))}
                      {car.features.length > 3 && (
                        <span className="feature-tag">+{car.features.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="car-actions">
                <Link to={`/cars/${car.id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CarList;