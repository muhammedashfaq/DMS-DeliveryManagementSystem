// import { createContext, useContext, useEffect, useState } from "react";
// // import jwt from 'jsonwebtoken';


// const UserContext =createContext()





// export const UserProvider =({children})=>{

 
//     let initialUserName=null
//     const token = localStorage.getItem('token')||null
//     if(token){
//         const parsedData = token

//         console.log(parsedData.name,'name',parsedData)

//         if (parsedData) {
//             initialUserName = parsedData.name
//           }
//     }
//     const [userName,setUserName] = useState("")

//             console.log(initialUserName);

    


//     return(
//         <UserContext.Provider value={{userName,setUserName}}>
//             {children}
//         </UserContext.Provider>
//     )
// }








// export const useUserContext = () => useContext(UserContext);









import { createContext, useContext, useEffect, useState } from "react";
// import jwt from "jsonwebtoken";

// const token = localStorage.getItem('token')||null
// const decodedToken = JSON.parse(token.split(".")[1]);
//         console.log(decodedToken.name); // Decoded token payload



const UserContext =createContext()

export const UserProvider =({children})=>{
    const [userName,setUserName] = useState(null)
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
    return(
        <UserContext.Provider value={{userName,setUserName}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);












// // userContext.js
// import { createContext, useContext, useEffect, useState } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const initialUserName = localStorage.getItem("userName") || null; // Get userName from local storage

//   const [userName, setUserName] = useState(initialUserName);

//   useEffect(() => {
//     // Save userName to local storage whenever it changes
//     if (userName) {
//       localStorage.setItem("userName", userName);
//     }
//   }, [userName]);

//   // Rest of your code...

//   return (
//     <UserContext.Provider value={{ userName, setUserName }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => useContext(UserContext);
