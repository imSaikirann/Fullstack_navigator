import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user || null;
    });

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(userData));
    }, [userData]);

    return (
        <AuthContext.Provider value={{ userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};
