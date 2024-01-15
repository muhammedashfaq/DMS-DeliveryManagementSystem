import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUserContext } from "../../Helper/context/userContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../Helper/redux/alertSlice";
import { RouteObjects } from "../../Routes/RouteObject";

// import{setUserName} from  '../../context/userContext'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Header = () => {
  const location = useLocation();

  const { userName } = useUserContext();

  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const guestnavigation = [
    // { name: 'Dashboard', href: '#', current: true },
    { name: "Home", href: "/" },
    { name: "Careers", href: "#" },
    { name: "Contact Us", href: "#" },
  ];
  const usernavigation = [
    { name: "Home", path: "/" },
    { name: "Book Shipment", path: RouteObjects.BookShipment },
  ];

  return (
    <Disclosure
      as="nav"
      className={`h-20 sticky top-0 z-10 transition duration-300 ${
        scrolled ? "bg-blue-950 text-white" : "bg-white text-black"
      }`}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center ">
                  {scrolled ? (
                    <img
                      className="h-20 w-auto"
                      src="./images/adminlogin/logo.png"
                      alt="Your Company"
                    />
                  ) : (
                    <img
                      className="h-20 w-auto"
                      src="../images/landingpage/logo.png"
                      alt="Your Company"
                    />
                  )}
                </div>
                <div className=" sm:ml-6 sm:block"></div>
              </div>
              <div className="flex space-x-4">
                {userName
                  ? usernavigation.map((item) => {
                      const isActive = location.pathname === item.path;

                      return (
                        <a
                          href={item.path}
                          key={item.name}
                          className={classNames(
                            "rounded-md px-3 py-2 text-sm font-semibold  hover:bg-gray-700 hover:text-white font-serif",
                            isActive && "bg-gray-700 text-white"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      )
                    })
                  : ""                 
                    }
              </div>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent focus:outline-none font-serif font-semibold"
                >
                  {userName ? userName : ""}
                </button>
                {isOpen && (
                  <ul className="absolute top-8 right-0 mt-2 bg-white dark:bg-gray-800 border rounded shadow-md w-40 h-max ">
                    <li>
                      <a
                        href={RouteObjects.UserProfile}
                        className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-700 hover:text-white font-serif font-semibold dark:hover:bg-gray-700 w-full text-left"
                      >
                    
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href={RouteObjects.contact}
                        className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-700 hover:text-white font-serif font-semibold dark:hover:bg-gray-700 w-full text-left"
                      >
                   
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <button 
                        onClick={() => {
                          localStorage.removeItem("token");

                          window.location.reload();
                          navigate("/");
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 font-serif font-semibold hover:bg-gray-700 hover:text-white dark:hover:bg-gray-700 w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}

                <Menu as="div" className="relative ml-3">
                  {/* <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div> */}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a 
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {guestnavigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
