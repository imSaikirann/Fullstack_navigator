import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [resource, setResource] = useState(null); 
  const [route, setRoute] = useState('/'); 

  return (
    <UserContext.Provider value={{ resource, setResource, route, setRoute }}>
      {children}
    </UserContext.Provider>
  );
};
