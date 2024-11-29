import React from 'react';
import RegistrationForm from './registrationForm';

const App: React.FC = () => {
//hello 
  return (
    <div className="container mt-5">
      <h1 className="text-center">Student Registration Form</h1>
      <RegistrationForm />
    </div>
  );
};

export default App;