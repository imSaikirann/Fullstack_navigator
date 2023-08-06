import React, { createContext, useState } from 'react'

export const AppContext = createContext();

export const AppProvider = ({children}) =>{
    const [selectedLang,setSelectedLang] = useState(null)

    return(
        <AppContext.Provider value={{selectedLang,setSelectedLang}}>
            {children}

        </AppContext.Provider>
    )
}

