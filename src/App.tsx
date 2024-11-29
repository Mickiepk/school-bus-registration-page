import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '/Users/mickiepk/Desktop/project/my-react-app/src/Homepage.tsx';
import RegistrationForm from './users/RegistrationForm';
import Signup from './users/Signup';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<div>Login Page</div>} /> {/* Placeholder for Login Page */}
          <Route path="/register" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;