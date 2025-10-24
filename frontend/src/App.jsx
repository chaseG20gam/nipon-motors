import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// placeholder components
const Home = () => <div><h1>Welcome to Nipon Motors</h1><p>Your premier car dealership platform</p></div>;
const Cars = () => <div><h1>Cars</h1><p>Car listing will go here</p></div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/cars" 
                element={
                  <ProtectedRoute>
                    <Cars />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
