import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import CarList from './components/CarList';
import CarDetail from './components/CarDetail';
import AddCar from './components/AddCar';
import EditCar from './components/EditCar';
import Home from './components/Home';
import './App.css';

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
              <Route path="/cars" element={<CarList />} />
              <Route path="/cars/add" element={
                <ProtectedRoute>
                  <AddCar />
                </ProtectedRoute>
              } />
              <Route path="/cars/:id" element={<CarDetail />} />
              <Route path="/cars/:id/edit" element={
                <ProtectedRoute>
                  <EditCar />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
