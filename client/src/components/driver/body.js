import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import UpdateModal from "./UpdateModal";
import TransistUpdateModal from "./transistUpdateModal";

import axios from "axios";

function Body() {
  const [updatetrackid,setupdatetrackid]=useState("")
  const [transistTrackid,settransistTrackid]=useState("")

  const [showModal, setShowModal] = useState(false);
  const [showtransistModal, setshowtransistModal] = useState(false);

  const [tabs, setTab] = useState("joblist");
  const [jobs, setJobs] = useState([]);
  const [transist, setTransist] = useState([]);



  const [search,setsearch]=useState("")

  const searchdatajobs = jobs.filter((shipment) => {
    
    return shipment.shipment[0].trackid.includes(search);
  });

  const [searchtransist,setsearchtransist]=useState("")

  const searchdatatransist = transist.filter((shipment) => {
    
    return shipment.shipment[0].trackid.includes(searchtransist);
  });



  const updatemodaldata =(trackid)=>{
    setShowModal(true)
    setupdatetrackid(trackid)

  }

  const transistmodaldata =(trackid)=>{
    setshowtransistModal(true)
    settransistTrackid(trackid)

  }


  const sendtransist = async (e, trackid) => {
    try {
      e.preventDefault();

      const response = await axios.post("/hub/transistshipment", { trackid });

      if (response.data.success) {
        toast.success(response.data.message);
        getjobs();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const aproveShipment = async (e, trackid) => {
    try {
      e.preventDefault();

      const response = await axios.post("/hub/approveShipment", { trackid });

      if (response.data.success) {
        toast.success(response.data.message);
        getjobs();

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const getjobs = async (req, res) => {
    try {
      const response = await axios.post(
        "/hub/getjobs",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("drivertoken"),
          },
        }
      );

      if (response.data.success) {
        setTransist(response.data.transist);
        setJobs(response.data.data);
      } else {
      }
    } catch (error) {}
  };
  useEffect(() => {
    getjobs();
  }, []);

  const tabclik = (tab) => {
    setTab(tab);
  };

  const handleclose = () => {
    setShowModal(false);
  };

  const handletransistclose = () => {
    setshowtransistModal(false);
  };

  return (
    <div className="m-4 h-mx ">
      <div className="bg-white p-8 rounded-md w-full ">
        <h1 className="my-10  text-center text-4xl font-bold underline">
          {" "}
          Jobs
        </h1>

        <div>
          <ul className="flex cursor-pointer">
            <li
              onClick={() => tabclik("joblist")}
              className={`py-2 px-6  ${
                tabs === "joblist" && `bg-gray-400 rounded-t-lg text-white`
              }`}
            >
              Job list
            </li>
            <li
              onClick={() => tabclik("transist")}
              className={`py-2 px-6  ${
                tabs === "transist" && `bg-gray-400 rounded-t-lg text-white`
              }`}
            >
              From Transist
            </li>
          </ul>
        </div>
        <hr />

        {tabs === "joblist" && (
      
            <div className="flex  justify-center ">
              <div className="flex bg-gray-50  p-2 rounded-md m-3 border-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                </svg>
                <input
                  className=" outline-none ml-1 block w-full "
                  type="text"
                  name="search"
                  value={search}
                  placeholder="Search..."onChange={(e)=>setsearch(e.target.value)}
                />
              </div>
       
            </div>
        )}

        {tabs === "joblist" && (
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      TrackID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      From
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Mobile
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      TO
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Mobile
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Advance
                    </th>{" "}
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Transist to
                    </th>{" "}
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                <UpdateModal
                          onClose={handleclose}
                          visible={showModal}
                          data={updatetrackid}
                        />
                  {searchdatajobs.map((shipment, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4"  >
                       

                        <button onClick={() => updatemodaldata(shipment.shipment[0].trackid)}>
                          {shipment.shipment[0].trackid}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        {shipment.shipment[0].shipmentStatus}
                      </td>
                      <td className="px-6 py-4">
                        {shipment.shipment[0].fromaddress}
                      </td>
                      <td className="px-6 py-4">
                        {shipment.shipment[0].frommobile}
                      </td>
                      <td className="px-6 py-4">
                        {shipment.shipment[0].toaddress}
                      </td>
                      <td className="px-6 py-4">
                        {shipment.shipment[0].tomobile}
                      </td>{" "}
                      <td className="px-6 py-4">
                        {shipment.shipment[0].advanceamountStatus
                          ? "Paid"
                          : "NotPaid"}
                      </td>{" "}
                      <td className="px-6 py-4">
                        {shipment.shipment[0].tocity}
                      </td>{" "}
                      <td className="px-6 py-4">
                        {" "}
                        {
                        shipment.shipment[0].shipmentStatus !== "approved" && shipment.shipment[0].shipmentStatus !== "Hub Recived" ? (
                          <button
                            type="submit"
                            onClick={(e) =>
                              aproveShipment(e, shipment.shipment[0].trackid)
                            }
                            className=" w-full px-8 py-3 font-semibold rounded  text-white bg-teal-800"
                          >
                            Approve
                          </button>
                        ) : shipment.fromhub !== shipment.shipment[0].tocity && shipment.shipment[0].shipmentStatus === "Hub Recived" ? (
                          <button
                            type="submit"
                            onClick={(e) =>
                              sendtransist(e, shipment.shipment[0].trackid)
                            }
                            className=" w-full px-8 py-3 font-semibold rounded  text-white bg-indigo-600"
                          >
                            send
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 4 of 50 Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {tabs === "transist" && (
                <div className="flex  justify-center ">
                <div className="flex bg-gray-50  p-2 rounded-md m-3 border-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                  </svg>
                  <input
                    className=" outline-none ml-1 block w-full "
                    type="text"
                    name="search"
                    value={search}
                    placeholder="Search..."onChange={(e)=>setsearch(e.target.value)}
                  />
                </div>
         
              </div>
        )}

        {tabs === "transist" && (
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      TrackID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      From
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Mobile
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      TO
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Mobile
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Advance
                    </th>{" "}
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Transisted From
                    </th>{" "}
                  </tr>
                </thead>
                <tbody>
                  <TransistUpdateModal
                    onClose={handletransistclose}
                    visible={showtransistModal}
                    data={transistTrackid}
                  />
                  {searchdatatransist.map((shipment, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">

                        <button onClick={() => transistmodaldata(shipment.shipment[0].trackid)}>
                          {shipment.shipment[0].trackid}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        {shipment.shipment[0].shipmentStatus}
                      </td>
                      <td className="px-6 py-4">
                        {shipment.shipment[0].fromaddress}
                      </td>
                      <td className="px-6 py-4">
                        {shipment.shipment[0].frommobile}
                      </td>
                      <td className="px-6 py-4">
                        {shipment.shipment[0].toaddress}
                      </td>
                      <td className="px-6 py-4">
                        {shipment.shipment[0].tomobile}
                      </td>{" "}
                      <td className="px-12 py-4">
                        {shipment.shipment[0].advanceamountStatus
                          ? "Paid"
                          : "NotPaid"}
                      </td>
                      <td className="px-12 py-4">
                        {shipment.shipment[0].fromcity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <span className="text-xs xs:text-sm text-gray-900">
                  Showing 1 to 4 of 50 Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Body;
