// HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome to the Student Registration System</h1>
      <p className="text-center">Please navigate to the registration form to register a new student.</p>
      <div className="text-center mt-4">
        <Link to="/login" className="btn btn-primary mx-2">Login</Link>
        <Link to="/register" className="btn btn-secondary mx-2">Sign Up</Link>
      </div>
    </div>
  );
};

export default HomePage;