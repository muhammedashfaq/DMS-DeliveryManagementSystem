import { createContext, useContext, useState } from "react";


const UserContext =createContext()

export const UserProvider =({children})=>{
    const [userName,setUserName] = useState('')
    return(
        <UserContext.Provider value={{userName,setUserName}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);