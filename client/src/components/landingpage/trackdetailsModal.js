import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const UpdateModal = ({ visible, onClose, data }) => {

  const updates =data.updates

  const shipmentdetails =data.shipment


  return (
    <div>
      <div
        id="container"
        className={`fixed inset-0 flex justify-center items-center z-50 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
      >
        <div className="w-5/6 shadow-inner flex justify-center  ">
          <div
            className=" bg-white border rounded-lg overflow-hidden w-full "
            style={{
              backgroundImage: "url(./images/landingpage/track.jpg)",
            }}
          >
            <div className=" bg-slate-600 rounded-t-sm flex justify-end p-2  pr-2 ">
              <button
                className="text-gray-400 hover:bg-white rounded-md p-1"
                onClick={() => onClose()}
              >
                {/* Close button (X icon) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <h1 className="text-center text-indigo-600 text-2xl font-semibold m-4">
              Shipment Details
            </h1>


           <div className="flex justify-evenly p-6 ">
              <div className="mb-4 ">
                <p className="text-gray-600 text-lg font-semibold mb-2">
                  Track ID:
                </p>
                <p className="text-gray-800 text-xl  ">{updates?.TrackID}</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 text-lg font-semibold mb-2">
                PickUp Date:
                </p>
                <p className="text-gray-800 text-xl ">{updates?.pickupdate}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 text-lg font-semibold mb-2">
                Delivered Date:
                </p>
                <p className="text-gray-800 text-xl ">{updates?.deliverydate}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 text-lg  font-semibold mb-2">
                  From Address:
                </p>
                <p className="text-gray-800">{shipmentdetails.fromaddress}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 text-lg  font-semibold mb-2">
                  To Address:
                </p>
                <p className="text-gray-800">{shipmentdetails?.toaddress}</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 text-lg font-semibold mb-2">
                  Shipment Status:
                </p>
                <p className="text-indigo-600 font-semibold">{updates?.status}</p>
              </div>
            </div>
            
            <div className="w-full  border-gray-200 mt-4 border-t-4 rounded-md h-28">
              {/* Timeline */}
              {/* <div className="p-4">
                <div className="flex items-center justify-evenly space-x-4">
                  <div className="relative ">
                    <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                      1
                    </div>
                    <span className=" mt-2 absolute top-full left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                      Driver Asigned
                    </span>
                  </div>

                  <div className="relative">
                    <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                      2
                    </div>
                    <span className=" mt-2 absolute top-full left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                      Shipment Picked
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                      2
                    </div>
                    <span className="mt-2 absolute top-full left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                      Hub Recived
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                      2
                    </div>
                    <span className="mt-2 absolute top-full left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                      Out of Delivery
                    </span>
                  </div>

                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-300 text-gray-800 rounded-full flex items-center justify-center">
                      3
                    </div>
                    <span className="mt-2 absolute top-full left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                      Shipment Delivered
                    </span>
                  </div>
                </div>
              </div> */}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
