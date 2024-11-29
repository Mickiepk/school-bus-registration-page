import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const SIGN_UP = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!, $role: String!) {
    signUp(name: $name, email: $email, password: $password, role: $role) {
      id
      name
      email
      role
    }
  }
`;

export interface UserAccount {
  username: string;
  password: string;
  email: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // Default role
  });

  const [errors, setErrors] = useState({ email: '', password: '' });
  const [signUp, { loading, error: mutationError }] = useMutation(SIGN_UP);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/;
    const newErrors = { email: '', password: '' };

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Incorrect email format';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.password = 'Password mismatch';
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      const userAccount: UserAccount = {
        username: formData.name,
        password: formData.password,
        email: formData.email,
      };

      try {
        await signUp({ variables: { ...userAccount, role: formData.role } });
        navigate('/dashboard');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ borderColor: errors.email ? 'red' : '' }}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ borderColor: errors.password ? 'red' : '' }}
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={{ borderColor: errors.password ? 'red' : '' }}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>
      <button type="submit" disabled={loading}>Sign Up</button>
      {mutationError && <p style={{ color: 'red' }}>{mutationError.message}</p>}
    </form>
  );
};

export default Signup;