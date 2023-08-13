import React from "react";
import { FaUser, FaLock } from 'react-icons/fa'
import "./dlogin.css";
const Login = () => {
    return (
        <div className="flex justify-center items-center min-h-screen w-full filter border-2 border-black dlogin">
          <div className="bg-white shadow-2xl h-max w-96 m-5 rounded-lg border-solid border-2 border-sky-500">
            <div>
              {/* Icon */} <img
                        className="h-20 w-auto"
                        src="./images/landingpage/logo.png"
                        alt="Your Company"
                      />
            </div>
    
            <h1 className="text-center font-bold text-2xl m-2">Login</h1>
            
            {/* Email Input */}
            <div className="m-2 flex justify-center relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FaUser className="text-gray-500" />
              </span>
              <input
                className="pl-2 bg-gray-200 my-2 w-72 h-8 rounded-sm"
                placeholder="Employee Id"
              />
            </div>
            
            {/* Password Input */}
            <div className="m-2 flex justify-center relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FaLock className="text-gray-500" />
              </span>
              <input
                className="pl-2 bg-gray-200 my-2 w-72 h-8 rounded-sm"
                placeholder="Password"
              />
            </div>
            
            <div className="flex justify-center">
              <button className="px-9 bg-blue-800 w-48 h-8 text-white rounded-sm">Login</button>
            </div>
            
            <p className="text-center m-2"><a href="#">Forgot password</a></p>
          </div>
        </div>
      );
    }


export default Login;
