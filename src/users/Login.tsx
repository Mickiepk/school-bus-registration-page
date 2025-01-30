import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserAccount } from '../models/RegistrationForm.ts';
import './Signup.css'; // Optional if you have styles for login
import { logInUser } from '../Services/Signup.tsx';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [mutationError, setMutationError] = useState('');
  const navigate = useNavigate();
  
  //const emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { username: '', password: '' };

   // if (!emailRegex.test(formData.email)) {
   //   newErrors.email = 'Invalid email address';
   // }
   if (!formData.username) {
    newErrors.username = 'Username is required';
  }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    // Prevent submission if there are validation errors
    if (newErrors.username || newErrors.password) {
      return;
    }

    try {
      const userAccount = {
        "UserAccount": {
        username: formData.username,
        password: formData.password,
        }
      };

      const response = await logInUser(userAccount);


      // Assuming the response contains a token
      //if (response.data.token) {
        //localStorage.setItem('authToken', response.data.token); // Save token if required
        //navigate('/dashboard'); // Redirect to dashboard or any other page
      //}
    } catch (error: any) {
      setMutationError('Invalid login credentials. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {mutationError && <p className="error">{mutationError}</p>}
      </form>
    </div>
  );
};

export default Login;