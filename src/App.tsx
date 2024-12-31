import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import HomePage from '/Users/mickiepk/Desktop/project/my-react-app/src/Homepage.tsx';
import Signup from './users/Signup';
import Login from './users/Login';

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'https://your-graphql-endpoint.com/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login/>} /> {/* Placeholder for Login Page */}
            <Route path="/register" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;