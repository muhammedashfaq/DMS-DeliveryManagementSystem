import React, { useState } from "react";
import { Link, useAsyncValue, useNavigate } from "react-router-dom";
import { LoginModal } from "./LoginModal";
import TrackdetailsModal from "./TrackdetailsModal";
import { useUserContext } from "../../Helper/context/userContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { trackshipmentdetails } from "./Userutil/api";


const Banner = () => {
  const navigate=useNavigate()
  const [showtrackModal, setshowtrackModal] = useState(false);
  const [shipmentdetails, setShipmentdetails] = useState("");
  const [updates, setUpdates] = useState("");
  const [trackid, settrackininput] = useState("");
  const { userName } = useUserContext();
  const [showMymodal, setshowMymodal] = useState(false);
  const trackshipment = async (e) => {
    try {
      e.preventDefault();

      if (trackid === "") {
        toast.error("Please enter a valid tracking ID")
         return; 
      }
      const response = await trackshipmentdetails(trackid)
      

      if (response.data.success) {
        toast.success(response.data.message);
        const shipment = response.data.shipment.shipment[0];
        const updates = response.data.updates;
        setShipmentdetails(shipment);
        setUpdates(updates);
        setshowtrackModal(true);
        settrackininput("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
        console.log(error);
        localStorage.removeItem("token");
        navigate("/");
    }
  };

  const handleclose = () => {
    setshowMymodal(false);
  };
  const handleclosetrack = () => {
    setshowtrackModal(false);
  };

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

      {userName ? (
        <div className=":hidden grid grid-cols-1 gap-3 items-center p-4 md:p-8 bg-white rounded-lg  bg-transparent shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="grid grid-cols-2 gap-1 md:grid-cols-2  md:gap-1 w-96 md:w-full bg-white p-4 md:p-8 rounded-lg shadow-lg mx-2 my-8">
            <input
              required
              type="text"
              placeholder="Shipment ID"
              value={trackid}
              onChange={(e) => settrackininput(e.target.value)}
              className="border rounded p-2 focus:outline-none"
            />
            <button
              onClick={trackshipment}
              className="bg-blue-950 text-white px-4 py-2 rounded"
            >
              Track
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-8 bg-white rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="md:w-1/2 bg-white p-4 md:p-8 rounded-lg shadow-lg mx-4 my-8 ">
            <h1 className="text-center font-bold text-xl mb-2">
              Track Your Shipment
            </h1>
            <input
              type="text"
              placeholder="Shipment ID"
              value={trackid}
              onChange={(e) => settrackininput(e.target.value)}
              className="border rounded p-2 focus:outline-none  ml-8 my-2"
            />
            <button
              onClick={trackshipment}
              className="bg-blue-950 text-white w-full py-2 rounded-full relative bottom-0"
            >
              Track Shipment
            </button>
          </div>
          <div className="md:w-1/2 bg-white p-4 md:p-8 rounded-lg shadow-lg mx-4 my-8">
            <h1 className="text-center font-bold text-xl mb-2">
              Book Your Shipment
            </h1>
            <p className="text-center mb-4">
              Click to login and experience more
            </p>
            <button
              className="bg-blue-950 text-white w-full py-2 rounded-full relative bottom-0"
              onClick={() => {
                setshowMymodal(true);
              }}
            >
              Login
            </button>

         
          </div>
        </div>
      )}

      <TrackdetailsModal
        onClose={handleclosetrack}
        visible={showtrackModal}
        data={{ shipment: shipmentdetails, updates: updates }}
      />

      <LoginModal onClose={handleclose} visible={showMymodal} />
    </div>
  );
};

export default Banner;
