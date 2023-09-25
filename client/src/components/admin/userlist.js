import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../Helper/redux/alertSlice";
import axios from "axios";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { Blocktheuser, UnBlocktheuser, UserDetails } from "./adminutil/api";

const Userlist = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);

  const filteredUsers = user.filter((user) => {
    const lowerCaseSearchInput = search.toLowerCase();
    return user.username.toLowerCase().includes(lowerCaseSearchInput);
    // user.email.toLowerCase().includes(lowerCaseSearchInput)
  });

  const getUserData = async () => {
    try {
      dispatch(showloading());

      const response = await UserDetails();

      dispatch(hideloading());
      setUser(response.data.data);
    } catch (error) {
      dispatch(hideloading());
    }
  };

  const handleclick = async (email, status) => {
    try {
      let response;

      if (status === false) {
        response = await Blocktheuser(email);
      } else {
        response = await UnBlocktheuser(email);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        getUserData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="container mt-5">
      <div class="relative overflow-y-auto shadow-md sm:rounded-lg ">
        <div className=" flex justify-evenly w-full h-14 dark:bg-gray-700 text-sm text-left text-gray-500 dark:text-gray-400  ">
          <fieldset className=" space-y-1 dark:text-gray-100 mt-2">
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

        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                User Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email Id
              </th>
              <th scope="col" class="px-6 py-3">
                Contact Number
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.length > 0 ? (
              filteredUsers?.map((user, index) => (
                <tr
                  key={index}
                  className="bg-black border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td
                    scope="row"
                    className="px-6  font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user?.username}
                  </td>
                  <td className="px-6 ">{user?.email}</td>
                  <td className="px-6 ">
                    {user?.isBlocked ? "True" : "false"}
                  </td>
                  <td className="px-6 py-2">
                    <a href="#">
                      <button
                        className={`w-20 h-8  rounded-lg font-bold text-black hover:bg-slate-600 ${
                          user.isBlocked ? "bg-blue-500" : "bg-red-800"
                        }`}
                        onClick={() => {
                          handleclick(user?.email, user?.isBlocked);
                        }}
                      >
                        {user.isBlocked ? "Unblock  " : "Block"}
                      </button>
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 bg-black text-center">
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

export default Userlist;
