import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const TransistUpdateModal = ({ visible, onClose, data }) => {
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
      trackid: trackidInput,
    }));
  };

  const updatestatus = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post("/hub/updateShipmentStatus", formdata);

      if (response.data.success) {
        toast.success(response.data.message);

        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const verify = async (e, trackid) => {
    try {
      e.preventDefault();

      const response = await axios.post("/hub/idverify", { trackid });

      if (response.data.success) {
        const statusdata = response.data.data.status;

        setStatus(statusdata);

        console.log(statusdata, "dattaaaa");

        toast.success("Verification successful");
      } else {
        toast.error("Verification failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
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
                  {status === "Transisted" ? (
                    <>
                      <option>---select---</option>
                      <option>Driver assigned</option>
                      <option>Out of Delivery</option>
                      <option>Shipment Delivered</option>
                    </>
                  ) : status === "Driver assigned" ? (
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

// {tabs === "transist" && (
//     <div className="w-full flex justify-center">
//       <div className="shadow rounded-lg overflow-hidden w-96 h-max p-6">
//         <form className="space-y-4">
//           <div className="relative">
//             <input
//               className="w-full px-3 py-2 border-b-2 border-gray-300 rounded-md placeholder-gray-400 "
//               placeholder="TrackID"
//               type="text"
//               name=""
//             />
//           </div>

//           <div className="relative">
//             <select className="w-full px-3 py-2 border-b-2 border-gray-300 rounded-md placeholder-gray-400 ">
//               <option>---select---</option>

//               <option>Driver assigned</option>
//               <option>Out of Delivery</option>
//               <option>delivered</option>
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700">
//               <svg
//                 className="fill-current h-4 w-4"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//               >
//                 {/* Dropdown icon */}
//                 <path
//                   fillRule="evenodd"
//                   d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </div>

//           <div className="relative">
//             <input
//               className="w-full px-3 py-2 border-b-2 border-gray-300 rounded-md placeholder-gray-400 "
//               placeholder=""
//               type="text"
//               name=""
//             />
//           </div>

//           <button
//             type="button"
//             className=" w-full px-8 py-3 font-semibold rounded  text-white bg-indigo-600"
//           >
//             Update
//           </button>
//         </form>
//       </div>
//     </div>
//   )}

export default TransistUpdateModal;
