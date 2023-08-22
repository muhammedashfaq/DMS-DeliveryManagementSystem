import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    // Get token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decode the token payload
        const payload = JSON.parse(atob(token.split(".")[1]));

        // Access the user's name from the payload
        if (payload) {
          setUserName(payload.name);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);
  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
