import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { API_BASE_URL } from '../services/api';
import './AddCar.css';

const AddCar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    fuel_type: 'PETROL',
    prefecture: '',
    image: null,
    feature_ids: [],
    owner_id: ''
  });
  
  const [features, setFeatures] = useState([]);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // fetch features and owners for dropdowns
    fetchFeatures();
    fetchOwners();
  }, [isAuthenticated, navigate]);

  const fetchFeatures = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/features/`);
      if (response.ok) {
        const data = await response.json();
        // ensure data is an array - handle paginated response
        console.log('Features loaded:', data);
        const featuresArray = data.results || data;
        setFeatures(Array.isArray(featuresArray) ? featuresArray : []);
      } else {
        console.error('Failed to fetch features:', response.status);
        setFeatures([]);
      }
    } catch (error) {
      console.error('Error fetching features:', error);
      setFeatures([]);
    }
  };

  const fetchOwners = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/owners/`);
      if (response.ok) {
        const data = await response.json();
        // ensure data is an array - handle paginated response
        const ownersArray = data.results || data;
        setOwners(Array.isArray(ownersArray) ? ownersArray : []);
      } else {
        console.error('Failed to fetch owners:', response.status);
        setOwners([]);
      }
    } catch (error) {
      console.error('Error fetching owners:', error);
      setOwners([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFeatureChange = (featureId) => {
    console.log('Feature change:', featureId, 'Current feature_ids:', formData.feature_ids);
    setFormData(prev => ({
      ...prev,
      feature_ids: prev.feature_ids.includes(featureId)
        ? prev.feature_ids.filter(id => id !== featureId)
        : [...prev.feature_ids, featureId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('access_token');
      
      const formDataToSend = new FormData();
      
      // add all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key === 'feature_ids') {
          // add each feature ID separately
          formData[key].forEach(featureId => {
            formDataToSend.append('feature_ids', featureId);
          });
        } else if (key === 'image' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else if (formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // debug log
      console.log('FormData being sent:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      const response = await fetch(`${API_BASE_URL}/cars/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        navigate('/cars');
      } else {
        // check if the response is json before parsing
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.error('API Error Response:', errorData);
          
          // Show specific field errors if available
          if (errorData.errors || errorData.non_field_errors) {
            const errors = errorData.errors || errorData.non_field_errors;
            setError(`Validation error: ${JSON.stringify(errors)}`);
          } else if (errorData.image) {
            setError(`Image error: ${errorData.image[0] || errorData.image}`);
          } else {
            setError(errorData.detail || errorData.message || 'Failed to create car listing');
          }
        } else {
          // if not, get the text response for debugging
          const errorText = await response.text();
          console.error('Non-JSON response:', errorText);
          setError(`Server error (${response.status}): Please check your authentication and try again.`);
        }
      }
    } catch (error) {
      setError('An error occurred while creating the car listing');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fuelChoices = [
    { value: 'PETROL', label: 'Petrol' },
    { value: 'DIESEL', label: 'Diesel' },
    { value: 'ELECTRIC', label: 'Electric' },
    { value: 'HYBRID', label: 'Hybrid' }
  ];

  return (
    <div className="add-car-container">
      <div className="add-car-form-wrapper">
        <div className="add-car-header">
          <h1 className="add-car-title">車を追加 - Add New Car</h1>
          <p className="add-car-subtitle">Create a new car listing for the marketplace</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="add-car-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter car title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="brand">Brand *</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
                placeholder="e.g., Toyota, Honda, Nissan"
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Model *</label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                required
                placeholder="e.g., Corolla, Civic, Skyline"
              />
            </div>

            <div className="form-group">
              <label htmlFor="year">Year *</label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                min="1900"
                max={new Date().getFullYear() + 1}
                placeholder="e.g., 2020"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mileage">Mileage (km) *</label>
              <input
                type="number"
                id="mileage"
                name="mileage"
                value={formData.mileage}
                onChange={handleInputChange}
                required
                min="0"
                placeholder="e.g., 50000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (¥) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                placeholder="e.g., 2500000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fuel_type">Fuel Type *</label>
              <select
                id="fuel_type"
                name="fuel_type"
                value={formData.fuel_type}
                onChange={handleInputChange}
                required
              >
                {fuelChoices.map(choice => (
                  <option key={choice.value} value={choice.value}>
                    {choice.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="prefecture">Prefecture *</label>
              <input
                type="text"
                id="prefecture"
                name="prefecture"
                value={formData.prefecture}
                onChange={handleInputChange}
                required
                placeholder="e.g., Tokyo, Osaka, Kanagawa"
              />
            </div>

            <div className="form-group">
              <label htmlFor="owner_id">Previous Owner</label>
              <select
                id="owner_id"
                name="owner_id"
                value={formData.owner_id}
                onChange={handleInputChange}
              >
                <option value="">Select an owner (optional)</option>
                {Array.isArray(owners) && owners.map(owner => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group form-group-full">
              <label htmlFor="image">Car Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleInputChange}
                accept="image/*"
                className="file-input"
              />
            </div>
          </div>

          <div className="features-section">
            <label className="features-label">Features</label>
            <div className="features-grid">
              {Array.isArray(features) && features.length > 0 ? features.map(feature => (
                <label key={feature.id} className="feature-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.feature_ids.includes(feature.id)}
                    onChange={() => handleFeatureChange(feature.id)}
                  />
                  <span className="feature-name">{feature.name}</span>
                </label>
              )) : (
                <div style={{padding: '10px', color: '#666'}}>
                  {features.length === 0 ? 'No features available' : 'Loading features...'}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/cars')}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-submit"
            >
              {loading ? 'Creating...' : 'Create Car Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;