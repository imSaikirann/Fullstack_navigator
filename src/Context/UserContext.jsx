import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [resource, setResource] = useState(()=>{
    const resData = JSON.parse(localStorage.getItem('resource'))
    return resData || null
  }  )
  const [route, setRoute] = useState('/'); 
  const [progress, setProgress] = useState(null); 


  return (
    <UserContext.Provider value={{ resource, setResource, route, setRoute,progress,setProgress }}>
      {children}
    </UserContext.Provider>
  );
};
