import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { trackusershipment } from "./adminutil/api";

const Admintrack = () => {
  const [trackDetails, setTrackDetails] = useState(false);

  const [trackinput, settrackininput] = useState("");
  const [shipmentdetails, setShipmentdetails] = useState([]);
  const [updates, setUpdates] = useState([]);

  const trackshipment = async (e) => {
    try {
      e.preventDefault();

      if (trackinput === "") {
        toast.error("Please enter a valid tracking ID")
         return; 
      }
      const response = await trackusershipment(trackinput);

      if (response.data.success) {
        toast.success(response.data.message);
        const shipment = response.data.shipment.shipment[0];
        const updates = response.data.updates;
        setTrackDetails(true);

        setShipmentdetails(shipment);
        setUpdates(updates);
        settrackininput("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {}
  };

  return (
    <div className="">
      <div style={{ maxWidth: "700px", margin: "100px auto" }}>
        <form className="flex items-center">
          <label htmlFor="voice-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="voice-search"
              value={trackinput}
              onChange={(e) => settrackininput(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 rounded-sm focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" Track ID......."
              required
            />
          </div>
          <button
            type="submit"
            onClick={trackshipment}
            className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white   rounded-md  hover:border  hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              className="mr-2 -ml-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            Track
          </button>
        </form>
      </div>

      {trackDetails && (
        <div className="  ">
          <div
            className=" bg-gray-700 border rounded-lg overflow-hidden w-full "
            style={{
              backgroundImage: "url(./images/landingpage/track.jpg)",
            }}
          >
            <h1 className="text-center text-indigo-600 text-2xl font-semibold m-4">
              Shipment Details
            </h1>
            <div className="flex justify-evenly p-6 ">
              <div className="mb-4 ">
                <p className="text-white text-lg font-semibold mb-2">
                  Track ID:
                </p>
                <p className="text-white text-xl  ">{updates?.TrackID}</p>
              </div>

              <div className="mb-4">
                <p className="text-white text-lg font-semibold mb-2">
                  PickUp Date:
                </p>
                <p className="text-white text-xl ">{updates?.pickupdate}</p>
              </div>

              <div className="mb-4">
                <p className="text-white text-lg font-semibold mb-2">
                  Delivered Date:
                </p>
                <p className="text-white text-xl ">{updates?.deliverydate}</p>
              </div>
              <div className="mb-4">
                <p className="text-white text-lg font-semibold mb-2">
                  From Address:
                </p>
                <p className="text-white text-xl ">
                  {shipmentdetails?.fromaddress}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-white text-lg  font-semibold mb-2">
                  To Address:
                </p>
                <p className="text-white">{shipmentdetails?.toaddress} </p>
              </div>

              <div className="mb-4">
                <p className="text-white text-lg font-semibold mb-2">
                  Shipment Status:
                </p>
                <p className="text-indigo-600 font-semibold">
                  {updates?.status}
                </p>
              </div>
            </div>
            <div className="w-full  border-gray-200 mt-4 border-t-4 rounded-md h-28">
              {/* Timeline */}
              {/* <div className="p-4">
                <div className="flex items-center justify-evenly space-x-4 ">
                  <div className="relative ">
                    <div className="w-8 h-8  bg-indigo-600 text-white rounded-full flex items-center justify-center">
                      1
                    </div>
                    <span className=" mt-2 absolute top-full left-1/2 transform -translate-x-1/2 text-xs text-white">
                      Driver Asigned
                    </span>
                  </div>

                  <div className="relative">
                    <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                      2
                    </div>
                    <span className=" mt-2 absolute top-full left-1/2 transform -translate-x-1/2 text-xs text-white">
                      Shipment Picked
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                      2
                    </div>
                    <span className=" mt-2 absolute top-full left-1/2 transform -translate-x-1/2 text-xs text-white">
                      Hub Recived
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                      2
                    </div>
                    <span className=" mt-2 absolute top-full left-1/2 transform -translate-x-1/2 text-xs text-white">
                      Out of Delivery
                    </span>
                  </div>

                  <div className="relative ">
                    <div className="w-8 h-8 bg-gray-300 text-gray-800 rounded-full flex items-center justify-center">
                      3
                    </div>
                    <span className=" mt-2 absolute top-full left-1/2 transform -translate-x-1/2 text-xs text-white">
                      Shipment Delivered
                    </span>
                  </div>
                </div>
              </div> */}
              {/* End of Timeline */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admintrack;
