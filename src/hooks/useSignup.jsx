// useSignup.js

import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const { setUserData } = useContext(AuthContext);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const signup = async (email, password) => {
    setError(null);

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/');
      } else {
        const json = await response.json();
        setError(json.message); // Assuming error messages are returned as 'message' from the backend.
      }
    } catch (error) {
      setError('An error occurred while signing up.');
    }
  };

  return { signup, error };
};
