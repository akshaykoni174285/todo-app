// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <div className='Main'>
        <h1 className='Title'>Todo App</h1>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Add more routes as needed */}
          <Route path='/dashboard' element={<ProtectedRoute />}>
            <Route path='tasks' element={<Dashboard/>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
