import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { getshipmentData } from "./adminutil/api";

const Shipmentlist = () => {
  const [shipmentdata, setshipmentdata] = useState([]);
  const [searchshipment, setSearchshipment] = useState("");

  const searcheddata = shipmentdata.filter((shipment) => {
    return shipment.shipment[0].trackid.includes(searchshipment);
  });

  const getjobs = async (req, res) => {
    try {
      const response = await getshipmentData();

      if (response.data.success) {
        toast.success(response.data.message);
        setshipmentdata(response.data.data);
      } else {
      }
    } catch (error) {}
  };
  useEffect(() => {
    getjobs();
  }, []);

  return (
    <div className="container mt-5">
      <div className="relative overflow-y-auto shadow-md sm:rounded-lg ">
        <div className="w-full h-14 flex justify-evenly dark:bg-gray-700 text-sm text-left text-gray-500 dark:text-gray-400">
          <fieldset className="space-y-1 dark:text-gray-100 mt-2">
            <label htmlFor="Search" className="hidden">
              Search
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="button"
                  title="search"
                  className="p-1 focus:outline-none focus:ring"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 dark:text-gray-100"
                  ></svg>
                </button>
              </span>
              <input
                type="search"
                name="Search"
                value={searchshipment}
                placeholder="Search..."
                onChange={(e) => setSearchshipment(e.target.value)}
                className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 focus:dark:border-violet-400"
              />
            </div>
          </fieldset>
        </div>

        <hr className="bg-gray-400" />
        <div className="overflow-auto h-96">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SL NO
                </th>
                <th scope="col" className="px-6 py-3">
                  Track ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Pickup Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Shipment Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Hub
                </th>
                <th scope="col" className="px-6 py-3">
                  Transit Location
                </th>
                {/* <th scope="col" className="px-6 py-3"></th> */}
              </tr>
            </thead>
            <tbody>
              {searcheddata?.length > 0 ? (
                searcheddata?.map((data, index) => (
                  <tr
                    key={index}
                    className="bg-black border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-3   font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-2">{data.shipment[0].trackid}</td>
                    <td className="px-6 py-2">{data.username}</td>
                    <td className="px-6 py-2">
                      {data.shipment[0].bookingdate.substring(0, 10)}
                    </td>
                    <td className="px-6 py-2">
                      {data.shipment[0].shipmentStatus}
                    </td>
                    <td className="px-6 py-2">{data.fromhub}</td>
                    <td className="px-6 py-2">{data.shipment[0].tocity}</td>
                    {/* <td className="px-6 py-2">
                      <button className="w-20 h-10 bg-blue-500 m-2 rounded-lg font-bold text-black hover:bg-slate-600">
                        View
                      </button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-2 bg-black text-center">
                    No matching data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Shipmentlist;
