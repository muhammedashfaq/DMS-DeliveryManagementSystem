import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);


  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      try {

        const payload = JSON.parse(atob(token.split(".")[1]));


        if (payload) {
          setUserName(payload.name);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);



  return (
    <UserContext.Provider value={{ userName,setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
