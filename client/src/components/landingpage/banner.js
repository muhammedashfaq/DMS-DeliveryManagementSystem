import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginModal } from "./loginModal";
import { useUserContext} from '../../context/userContext'

const Banner = () => {
  const {userName} = useUserContext()


  const [showMymodal, setshowMymodal] = useState(false);

  const handleclose=()=>{
    setshowMymodal(false)
  }

  return (
    <div className=" w-full h-96 ">
      <img
        className="h-full w-full"
        src="./images/landingpage/banner.jpg"
        alt=""
      />
      <div className="absolute top-0 text-white p-28">
        <h1 className="text-4xl font-bold">Products and Services</h1>
        <p className="text-lg">
          Leverage our wide-range of tech-enabled shipping solutions to scale
          your e-commerce business.
        </p>
      </div>


  {userName? (<div className="grid grid-cols-1 gap-3 items-center p-4 md:p-8 bg-white rounded-lg  bg-transparent shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  <div className="grid grid-cols-2 gap-1 md:grid-cols-2  md:gap-1 w-96 md:w-full bg-white p-4 md:p-8 rounded-lg shadow-lg mx-2 my-8">
    <input
      type="text"
      placeholder="Shipment ID"
      className="border rounded p-2 focus:outline-none"
    />
    <button className="bg-blue-950 text-white px-4 py-2 rounded">
      Track
    </button>
  </div>

      
    </div>)
      
       :  
       ( <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-8 bg-white rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="md:w-1/2 bg-white p-4 md:p-8 rounded-lg shadow-lg mx-4 my-8">
          <h1 className="text-center font-bold text-xl mb-2">
            Track Your Shipment
          </h1>
          <p className="text-center mb-4"> Click to Track shipment here</p>
          <button className="bg-blue-950 text-white w-full py-2 rounded-full relative bottom-0" >
            Track Shipment
          </button>
        </div>
        <div className="md:w-1/2 bg-white p-4 md:p-8 rounded-lg shadow-lg mx-4 my-8">
          <h1 className="text-center font-bold text-xl mb-2">
            Book Your Shipment
          </h1>
          <p className="text-center mb-4">Click to login and experience more</p>
        <button className="bg-blue-950 text-white w-full py-2 rounded-full relative bottom-0" onClick={()=>{setshowMymodal(true)}}>
          Login
          </button>
        </div>
      </div> )}


      <LoginModal onClose={handleclose} visible={showMymodal}  />
    </div>
  );
};

export default Banner;
