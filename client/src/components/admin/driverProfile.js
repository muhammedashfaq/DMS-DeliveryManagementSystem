import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { hideloading, showloading } from "../../Helper/redux/alertSlice";
import { toast } from "react-hot-toast";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  List,
  ListItem,
} from "@material-tailwind/react";
import { adminRequest } from "../../Helper/interceptor/axois";
import { RouteObjects } from "../../Routes/RouteObject";

const Driverdetails = () => {
  const navigate = useNavigate();
  const [tabs, settabs] = useState("about");
  const [driver, setdriver] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const getprofile = async () => {
    try {
      dispatch(showloading());
      adminRequest({
        url: `/admin/get-profile/${id}`,
        method: "POST",
      })
        .then((response) => {
          dispatch(hideloading());
          if (response.data.success) {
            toast.success(response.data.message);
            toast.success(response.data.message);
            const data = response.data.data;
            setdriver(data);
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
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const tabclick = (tab) => {
    settabs(tab);
  };
  const clickupdate = async (driverid, status) => {
    try {
      dispatch(showloading());
      const response = await axios.put(`/admin/driverstatusUpdat/${driverid}`, {
        status: status,
      });
      dispatch(hideloading());
      if (response.data.success) {
        toast.success(response.data.message);
        getprofile();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading());

      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getprofile();
  }, []);

  return (
    <div className="container mt-8">
      <div className="bg-slate-700 w-full h-screen grid grid-cols-3 rounded-md">
        <div className="row-span-3 container relative">
          <div className="flex flex-col max-w-md p-6 dark:bg-gray-900 dark:text-gray-100 mt-10 ml-10">
            <img
              src={driver?.profileimage ? driver?.profileimage : "hahah"}
              alt="Driver"
              className="flex-shrink-0 object-cover h-64 rounded-sm sm:h-96 dark:bg-gray-500 aspect-square"
            />
            <div className="flex justify-evenly">
              <Popover placement="bottom">
                <PopoverHandler>
                  <Button
                    className={`bg-gray-700 mt-3 ${
                      driver?.activestatus === "Terminated"
                        ? `bg-gray-800 `
                        : driver?.activestatus === "Blocked"
                        ? `bg-red-800`
                        : `bg-blue-800`
                    }`}
                  >
                    {driver?.activestatus}
                  </Button>
                </PopoverHandler>
                <PopoverContent className="w-40">
                  <List className="p-0">
                    <a
                      href="#"
                      className="text-initial"
                      onClick={() => {
                        clickupdate(driver?._id, "Active");
                      }}
                    >
                      <ListItem>Active</ListItem>
                    </a>
                    <a
                      href="#"
                      className="text-initial"
                      onClick={() => {
                        clickupdate(driver?._id, "Blocked");
                      }}
                    >
                      <ListItem>Block</ListItem>
                    </a>
                    <a
                      href="#"
                      className="text-initial"
                      onClick={() => {
                        clickupdate(driver?._id, "Terminated");
                      }}
                    >
                      <ListItem>Terminate</ListItem>
                    </a>
                  </List>
                </PopoverContent>
              </Popover>

              <h1 className="mt-8">EMP ID : {driver?.employeeId}</h1>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-gray-900 m-10 h-max dark:text-gray-100">
          <div className="flex justify-around dark:bg-gray-800  ">
            <a
              rel="noopener noreferrer"
              href="#"
              className={`px-5 py-1  dark:border-gray-700 ${
                tabs === "about" && `border-b-2`
              }`}
              onClick={() => tabclick("about")}
            >
              About
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className={`px-5 py-1  dark:border-gray-700 ${
                tabs === "jobdescription" && `border-b-2`
              }`}
              onClick={() => tabclick("jobdescription")}
            >
              Job discription
            </a>
          </div>

          {tabs === "about" ? (
            <div className="md:col-span-1">
              <div className="md:col-span-1 container shadow-md">
                <div className="mb-4">
                  <div className="p-3">
                    <div className="mb-2 flex items-center">
                      <p className="w-1/4 text-sm md:text-base lg:text-lg">
                        Full Name
                      </p>
                      <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                        {driver?.fname + " " + driver?.lname}
                      </p>
                    </div>
                    <hr className="my-2" />
                    <div className="mb-2 flex items-center">
                      <p className="w-1/4 text-sm md:text-base lg:text-lg">
                        Email
                      </p>
                      <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                        {driver?.email}
                      </p>
                    </div>
                    <hr className="my-2" />
                    <div className="mb-2 flex items-center">
                      <p className="w-1/4 text-sm md:text-base lg:text-lg">
                        Contact Number
                      </p>
                      <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                        {driver?.mobile}
                      </p>
                    </div>
                    <hr className="my-2" />
                    <div className="mb-2 flex  items-center">
                      <p className="w-1/4 text-sm md:text-base lg:text-lg">
                        Address
                      </p>

                      <div className="w-3/4 text-muted text-sm md:text-base lg:text-lg break-words h-max">
                        {driver?.address}
                      </div>
                    </div>

                    <hr className="my-2" />
                    <div className="mb-2 flex items-center">
                      <p className="w-1/4 text-sm md:text-base lg:text-lg">
                        Hub City
                      </p>
                      <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                        {driver?.city}
                      </p>
                    </div>
                    <hr className="my-2" />
                    <div className="mb-2 flex items-center">
                      <p className="w-1/4 text-sm md:text-base lg:text-lg">
                        Licence Number
                      </p>
                      <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                        {driver?.licence}
                      </p>
                    </div>

                    <hr className="my-2" />
                    <div className="mb-2 flex  items-center">
                      <p className="w-1/4 text-sm md:text-base lg:text-lg">
                        Bio
                        <a href="#">
                          <span className="material-symbols-outlined ml-4 absolute mt-1">
                            add_circle
                          </span>
                        </a>
                        <a href="#">
                          <span class="material-symbols-outlined ml-12 absolute mt-1">
                            edit
                          </span>
                        </a>
                      </p>

                      <div className="w-3/4 text-muted text-sm md:text-base lg:text-lg break-words h-max">
                        If you're still facing issues, it's possible that other
                        styles in your applicationools to identify any conflicts
                        or issues. Additionally, consider the context and
                        surrounding elements in your layout that might be
                        impacting the behavior of this particular section.
                      </div>
                    </div>

                    <hr className="my-2" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="md:col-span-1">
              <div className="md:col-span-1 container shadow-md">
                {/* <div className="mb-4">
                <div className="p-3">
                  <div className="mb-2 flex items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Full Name
                    </p>
                    <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                      {driver?.fname + " " + driver?.lname}
                    </p>
                  </div>
                  <hr className="my-2" />
                  <div className="mb-2 flex items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Email
                    </p>
                    <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                      {driver?.email}
                    </p>
                  </div>
                  <hr className="my-2" />
                  <div className="mb-2 flex items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Contact Number
                    </p>
                    <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                      {driver?.mobile}
                    </p>
                  </div>
                  <hr className="my-2" />
                  <div className="mb-2 flex  items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Address
                    </p>

                    <div className="w-3/4 text-muted text-sm md:text-base lg:text-lg break-words h-max">
                      {driver?.address}
                    </div>
                  </div>

                  <hr className="my-2" />
                  <div className="mb-2 flex items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Gender
                    </p>
                    <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                      {driver?.gender}
                    </p>
                  </div>
                  <hr className="my-2" />
                  <div className="mb-2 flex items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Licence Number
                    </p>
                    <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                      {driver?.licence}
                    </p>
                  </div>
                  <hr className="my-2" />
                  <div className="mb-2 flex items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">Age</p>
                    <p className="w-3/4 text-muted text-sm md:text-base lg:text-lg">
                      {driver?.age}
                    </p>
                  </div>

                  <hr className="my-2" />
                  <div className="mb-2 flex  items-center">
                    <p className="w-1/4 text-sm md:text-base lg:text-lg">
                      Bio
                      <a href="#">
                        <span className="material-symbols-outlined ml-4 absolute mt-1">
                          add_circle
                        </span>
                      </a>
                      <a href="#">
                        <span class="material-symbols-outlined ml-12 absolute mt-1">
                          edit
                        </span>
                      </a>
                    </p>

                    <div className="w-3/4 text-muted text-sm md:text-base lg:text-lg break-words h-max">
                      If you're still facing issues, it's possible that other
                      styles in your applicationools to identify any conflicts
                      or issues. Additionally, consider the context and
                      surrounding elements in your layout that might be
                      impacting the behavior of this particular section.
                    </div>
                  </div>

                  <hr className="my-2" />
                </div>
              </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Driverdetails;
