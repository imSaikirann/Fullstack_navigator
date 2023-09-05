import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
    const { setUserData } = useContext(AuthContext);
    const navigate = useNavigate();

    const signup = async (email, password) => {
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
                console.log(userData);
                 
                localStorage.setItem('user', JSON.stringify(userData));
                navigate('/');
            } else {
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return { signup };
};
