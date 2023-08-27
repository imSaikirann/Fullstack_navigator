import React from 'react';

import { AuthContext } from "../Context/AuthContext";

export const useLogout = ()=>{
    const { setUserData } = React.useContext(AuthContext);
const logout = ()=>{
    localStorage.removeItem('user')
    setUserData(null)
}
return { logout}
}