import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "./modal";

const Banner = () => {

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
      {/* <div className=' leading-10	 flex justify-between  flex-col md:flex-row rounded-lg  h-max w-max	 bg-white 	 border center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>    <div class="md:w-1/2 bg-white p-8 rounded-lg shadow-lg mx-4 my-8">
        <h1 class="text-center font-bold text-xl mb-2">Track Your Shipment</h1>
        <p class="text-center mb-4">Click to Track shipment here  </p>
        <button class="bg-blue-950 text-white w-full py-2 rounded-full relative bottom-0">Track a Shipment</button>
    </div>
    <div class="md:w-1/2 bg-white p-8 rounded-lg shadow-lg mx-4 my-8">
        <h1 class="text-center font-bold text-xl mb-2">Book Your Shipment</h1>
        <p class="text-center mb-4">Click to login and experience more </p>
        <button class="bg-blue-950 text-white w-full py-2 rounded-full relative bottom-0">Please Login</button>
    </div>
</div>  */}

      <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-8 bg-white rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="md:w-1/2 bg-white p-4 md:p-8 rounded-lg shadow-lg mx-4 my-8">
          <h1 className="text-center font-bold text-xl mb-2">
            Track Your Shipment
          </h1>
          <p className="text-center mb-4"> Click to Track shipment here</p>
          <button className="bg-blue-950 text-white w-full py-2 rounded-full relative bottom-0" onClick={()=>{setshowMymodal(true)}}>
            Track Shipment
          </button>
        </div>
        <div className="md:w-1/2 bg-white p-4 md:p-8 rounded-lg shadow-lg mx-4 my-8">
          <h1 className="text-center font-bold text-xl mb-2">
            Book Your Shipment
          </h1>
          <p className="text-center mb-4">Click to login and experience more</p>
          <Link to="/login"><button className="bg-blue-950 text-white w-full py-2 rounded-full relative bottom-0">
          Login
          </button></Link>
        </div>
      </div>
      <Modal onClose={handleclose} visible={showMymodal}  />
    </div>
  );
};

export default Banner;
