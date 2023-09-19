import { Dropdown } from "flowbite-react";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RouteObjects } from "../../Routes/RouteObject";

const Nav = () => {
  const location = useLocation();
  const menu = [
    {
      name: "Dashboard",
      path: RouteObjects.AdminDashboard,
      icon: "material-symbols-outlined",
      iconname: "dashboard",
    },

    {
      name: "Track Shipment",
      path: RouteObjects.AdminTracking,
      icon: "material-symbols-outlined",
      iconname: "location_on",
    },
    {
      name: "Services",
      path: RouteObjects.ServicesPage,
      icon: "material-symbols-outlined",
      iconname: "device_hub",
    },
  ];
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="fixed top-0 bottom-0 lg:left-0 p-2 w-1/6  overflow-y-auto text-center bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 "
        style={{
          marginRight: "300px",
        }}
      >
       
           
    
        <hr className="my-2 text-gray-600 " />
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          <input
            className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
            placeholder="Search"
          />
        </div>

        {menu?.map((menuitem) => {
          const isActive = location.pathname === menuitem.path;
          return (
            <div
              key={menuitem.path}
              className={`p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-600 ${
                isActive &&
                `text-blue-700 font-bold bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900`
              }`}
            >
              <span className="text-gray-200">
                <span className={menuitem.icon}>{menuitem.iconname}</span>
              </span>
              <span className="text-[15px] ml-4 text-gray-200">
                <Link to={menuitem.path}>{menuitem.name}</Link>
              </span>
            </div>
          );
        })}

        <hr className="bg-gray-400" />

        <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer w-max">
          <i className="bi bi-house-door-fill"></i>
          {/* <span className="text-[15px] ml-4 text-gray-200">Management</span> */}
          <Dropdown
            className="bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900  text-white  "
            label="Management"
          >
            <Dropdown.Item className=" text-white p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600">
              <Link to={RouteObjects.UserList}>
                User
                <span class="material-symbols-outlined">person_search</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="text-white p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600">
              {" "}
              <Link to={RouteObjects.DriverList}>
                HUB
                <span class="material-symbols-outlined">local_shipping</span>
              </Link>
            </Dropdown.Item>

            <Dropdown.Item className="text-white p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600">
              {" "}
              <Link to={RouteObjects.ShipmentList}>
                Shipment
                <span class="material-symbols-outlined">package_2</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="text-white p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600">
              <span
                onClick={() => {
                  localStorage.removeItem("admintoken");
                  navigate(RouteObjects.AdminLogin);
                }}
              >
                Logout
              </span>
              <span class="material-symbols-outlined">logout</span>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="absolute bottom-0 mb-6">

        <Link to={RouteObjects.AdminDashboard}>
              <img src="./images/adminlogin/logo.png" />
            </Link>
        </div>
      </div>

      

      
    </div>
  );
};

export default Nav;
