// UserContext.js

import React, { createContext,  useState } from 'react';

export const UserContext = createContext(); 

export const   UserProvider =({ children })=> {
    const [userData, setUserData] = useState(null);
    const [resource, setResource] = useState(null);



    return (
        <UserContext.Provider value={{ userData, setUserData,resource,setResource }}>
            {children}
        </UserContext.Provider>
    );
}


