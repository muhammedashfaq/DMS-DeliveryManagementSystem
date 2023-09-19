import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { hubRequest } from "../../Helper/interceptor/axois";
import { useNavigate } from "react-router-dom";
import { RouteObjects } from "../../Routes/RouteObject";

const UpdateModal = ({ visible, onClose, data }) => {
  const navigate = useNavigate();
  const [trackidInput, setTrackidInput] = useState("");
  const [status, setStatus] = useState("");

  const [formdata, setFormdata] = useState({
    trackid: "",
    status: "",
    comments: "",
  });
  const inputchange = (event) => {
    const { name, value } = event.target;
    setFormdata((preformdata) => ({
      ...preformdata,
      [name]: value,
      trackid: data,
    }));
  };
  const updatestatus = async (e) => {
    try {
      e.preventDefault();

      hubRequest({
        url: "/hub/updateShipmentStatus",
        method: "post",
        data: formdata,
      })
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message);

            window.location.reload();
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((err) => {
          toast.error("something went wrong");
          console.log(err);
          localStorage.removeItem("drivertoken");
          navigate(RouteObjects.HubLogin);
        });
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const verify = async (e, trackid) => {
    e.preventDefault();

    hubRequest({
      url: "/hub/idverify",
      method: "post",
      data: { trackid: trackid },
    })
      .then((response) => {
        if (response.data.success) {
          const statusdata = response.data.data.status;

          setStatus(statusdata);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        toast.error("something went wrong");
        console.log(err);
        localStorage.removeItem("drivertoken");
        navigate(RouteObjects.HubLogin);
      });
  };

  return (
    <div>
      <div
        id="container"
        className={`fixed inset-0 flex justify-center items-center z-50 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
      >
        <div className="w-full flex justify-center">
          <div className="bg-white border rounded-lg overflow-hidden w-full max-w-md p-6">
            <div className="flex justify-end">
              <button
                className="text-gray-400 hover:text-gray-600"
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

            <h1 className="text-center text-indigo-600 text-2xl font-semibold mb-4">
              Update Status
            </h1>
            <form className="space-y-4" onSubmit={updatestatus}>
              <div className="relative flex items-center">
                <input
                  className="w-full px-3 py-2 border-b-2 border-gray-300 rounded-md placeholder-gray-400"
                  placeholder="Track ID"
                  type="text"
                  name="trackid"
                  value={data}
                  onChange={(e) => setTrackidInput(data)}
                />
                <button
                  type="button"
                  onClick={(e) => verify(e, data)}
                  className="ml-2 text-indigo-600 hover:underline focus:outline-none"
                >
                  Verify
                </button>
              </div>

              <div className="relative">
                <label className="block font-medium text-gray-700">
                  Status Update
                </label>
                <select
                  name="status"
                  onChange={inputchange}
                  className="w-full px-3 py-2 border-b-2 border-gray-300 rounded-md placeholder-gray-400"
                >
                  {status === "Aproved" ? (
                    <>
                      <option>---select---</option>
                      <option>Driver assigned</option>
                      <option>Shipment picked</option>
                      <option>Hub Recived</option>
                      <option>Out of Delivery</option>
                      <option>Shipment Delivered</option>
                    </>
                  ) : status === "Driver assigned" ? (
                    <>
                      <option>---select---</option>

                      <option>Shipment picked</option>
                      <option>Hub Recived</option>
                      <option>Out of Delivery</option>
                      <option>Shipment Delivered</option>
                    </>
                  ) : status === "Shipment picked" ? (
                    <>
                      <option>---select---</option>

                      <option>Hub Recived</option>
                      <option>Out of Delivery</option>
                      <option>Shipment Delivered</option>
                    </>
                  ) : status === "Hub Recived" ? (
                    <>
                      <option>---select---</option>

                      <option>Out of Delivery</option>
                      <option>Shipment Delivered</option>
                    </>
                  ) : status === "Out of Delivery" ? (
                    <>
                      <option>---select---</option>

                      <option>Shipment Delivered</option>
                    </>
                  ) : (
                    ""
                  )}
                </select>
              </div>

              <div className="relative">
                <input
                  className="w-full px-3 py-2 border-b-2 border-gray-300 rounded-md placeholder-gray-400"
                  placeholder="Comments..."
                  type="text"
                  name="comments"
                  onChange={inputchange}
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 text-white font-semibold rounded bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    
  );
};

export default UpdateModal;
