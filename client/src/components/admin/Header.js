import React, { useContext, useEffect } from "react";
import { useUserContext } from "../../context/userContext";

const Header = () => {
  
  const { userName  } = useUserContext();

  console.log(userName);
  
  return (
    <div className=" h-16 flex justify-end ">
      <div className="flex justify-end  w-96 border-b-4 border-gray-500">
        <div className="hidden sm:ml-6 sm:block">
        {userName && ( // Conditionally render if userName is available
            <div className="flex space-x-4 pt-6">
              <a href="#">Hi Admin {userName}</a>
            </div>
          )}
        </div>

        <div className="hidden sm:ml-6 sm:block">
          <a href="/adminhome/adminprofile">
            <div className="flex space-x-4  mr-7 pt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
