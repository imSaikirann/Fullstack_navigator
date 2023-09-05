import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../Context/UserContext";

export const useLogin = () => {
  const navigate = useNavigate();
  const { route } = useContext(UserContext);
  const { setUserData } = useContext(AuthContext);

  const login = async (email, password, formikActions) => {
    try {
      const response = await fetch('/api/user/login', {
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
        formikActions.setSubmitting(false);

        // Call the loginCallback after successful login

        navigate(route);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return { login };
};
