// UserContext.js

import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export const   UserProvider =({ children })=> {
    const [userData, setUserData] = useState(null);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}


