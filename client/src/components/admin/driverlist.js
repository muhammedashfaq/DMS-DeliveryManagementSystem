import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../Helper/redux/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import { adminRequest } from "../../Helper/interceptor/axois";
import toast from "react-hot-toast";
import { RouteObjects } from "../../Routes/RouteObject";

const Driverlist = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [driver, setDriver] = useState([]);
  const dispatch = useDispatch();

  const filtereddriver = driver.filter((user) => {
    const lowerCaseSearchInput = search.toLowerCase();
    return user.fname.toLowerCase().includes(lowerCaseSearchInput);
    //   user.lname.toLowerCase().includes(lowerCaseSearchInput)  ,
    //  user.email.toLowerCase().includes(lowerCaseSearchInput)
  });

  const getDriverrData = async () => {
    try {
      dispatch(showloading());
      adminRequest({
        url: "/admin/get-driverDetials",
        method: "GET",
      })
        .then((response) => {
          dispatch(hideloading());
          if (response.data.success) {
            toast.success(response.data.message);
            setDriver(response.data.data);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((err) => {
          toast.error("Something went wrong");
          console.log(err);
          localStorage.removeItem("admintoken");
          navigate(RouteObjects.AdminLogin);
        });
    } catch (error) {
      dispatch(hideloading());
    }
  };


  useEffect(() => {
    getDriverrData();
  }, []);
  return (
    <div className="container mt-5">
      <div class="relative overflow-y-auto shadow-md sm:rounded-lg ">
        <div className=" w-full h-14 flex justify-evenly dark:bg-gray-700 text-sm text-left text-gray-500 dark:text-gray-400 ">
          <Link to={RouteObjects.AddDriver}>
            {" "}
            <button className="w-36 h-10 bg-blue-500 m-2 rounded-lg font-bold text-black hover:bg-slate-600">
              Add
            </button>
          </Link>
          <fieldset className="space-y-1 dark:text-gray-100 mt-2">
            <label for="Search" className="hidden">
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
                  >
                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                name="Search"
                value={search}
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 focus:dark:border-violet-400"
              />
            </div>
          </fieldset>
        </div>
        <hr className="bg-gray-400" />

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Hub Admin Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email Id
              </th>
              <th scope="col" class="px-6 py-3">
                Contact Number
              </th>
              <th scope="col" class="px-6 py-3">
                Hub Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filtereddriver?.length > 0 ? (
              filtereddriver?.map((driver, index) => (
                <tr
                  key={index}
                  className="bg-black border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-3   font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link
                      to={`/adminhome/driver_profile/?id=${driver?._id}`}
                      
                      
                    >
                      {driver?.fname + " " + driver?.lname}
                    </Link>
                  </th>
                  <td className="px-6 py-2">{driver?.email}</td>
                  <td className="px-6 py-2">{driver?.mobile}</td>
                  <td className="px-6 py-2">{driver?.activestatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-2 bg-black text-center">
                  No matching data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Driverlist;
