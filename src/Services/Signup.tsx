import axios from 'axios';

// Set base URL for Axios
const API = axios.create({
  baseURL: 'http://localhost:8000/', // Update this to match your back-end base URL
});

// Sign Up API
export const signUpUser = async (data:  {"UserAccount":  { username: string; email: string; password: string;}}) => {
  try {
    console.log(data)
    const response = await API.post('auth/register/', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};


export const logInUser = async (data:  {"UserAccount":  { username: string; password: string;}}) => {
    try {
      console.log(data)
      const response = await API.post('auth/login/', data);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: 'An error occurred' };
    }
  };
