import React from 'react'
import './Alogin.css'
import { FaEnvelope, FaLock } from 'react-icons/fa'


const login = () => {
  return (
    <div className='w-screen h-screen alogin flex flex-col sm:flex-row alogin 	'>
    <div className='w-96  sm:w-1/2 h-1/3 sm:h-screen flex justify-center items-center'>

      <img src='./images/adminlogin/logo.png'/>
    </div>
  
    <div className='w-full sm:w-1/2 h-2/3 sm:h-screen flex justify-center items-center '>
      <div className="bg-white shadow-2xl w-11/12 sm:w-96 m-5 rounded-lg border-solid border-2 border-sky-500 p-4">
        <h1 className="text-center font-bold text-2xl mb-4">Login</h1>
      
        <div className="m-2">
          <span className="flex items-center">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              className="pl-2 bg-gray-200 w-full h-8 rounded-sm"
              placeholder="Email Id"
            />
          </span>
        </div>
        
        <div className="m-2">
          <span className="flex items-center">
            <FaLock className="text-gray-500 mr-2" />
            <input
              className="pl-2 bg-gray-200 w-full h-8 rounded-sm"
              placeholder="Password"
              type="password"
            />
          </span>
        </div>
        
        <div className="flex justify-center">
          <button className="mt-4 px-9 bg-blue-800 w-full sm:w-48 h-8 text-white rounded-sm">Login</button>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default login