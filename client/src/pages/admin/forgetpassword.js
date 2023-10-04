import { Alert } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { hideloading, showloading } from "../../Helper/redux/alertSlice";
import { toast } from "react-hot-toast";
import { BiSolidLock } from "react-icons/bi";
import { RouteObjects } from "../../Routes/RouteObject";

const Forgetadmin = () => {
  const navigate = useNavigate();
  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    const generateRandomString = (length) => {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
      }

      return result;
    };

    const randomString = generateRandomString(40);
    setRandomString(randomString);
  }, []);
  const dispatch = useDispatch();
  const [forget, setForget] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const error = validate(forget);
      setForget(error);
        if (Object.keys(error).length === 0) {
          alert("done");
        }
      dispatch(showloading());
      const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/forgetadmin`, {
        email: forget,
        token: randomString,
      });
      dispatch(hideloading());

      if (response.data.success) {
     toast.success(response.data.message);
        navigate(RouteObjects.AdminLogin);

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading());
      toast.error("somthing went wrong");
    }
  };

  const validate = (forget) => {
    const error = {};

    if (forget.trim() === "") {
      error.forget = "Field is Required";
    } else {
      error.forget = "";
    }
    return error;
  };

  return (
    <div className="w-full  h-screen	flex justify-center 	">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-max w-96	m-5	rounded-lg	border-solid border-2 border-sky-500">
        <h2
          className="text-center font-semibold text-lg mt-1
"
        >
          Forget password
        </h2>
        <form onSubmit={handleSubmit}>
          
          <div className=" mt-4 mx-4 flex items-center relative "  >
          <p className="absolute right-0 mr-2">
            {/* icon */}
            <BiSolidLock />
            </p>
            <input
              className="w-full	h-10 rounded-md pl-2"
              placeholder="Enter Email"
              type="email"
              name="email"
              onChange={(e) => setForget(e.target.value)}
              
            />

         
          </div>
          <div className="w-80 ml-7 align-middle  ">

          {forget.forget && (
            <Alert className="" variant="filled" severity="error">
                {forget.forget}
              </Alert>
            )}
            </div>
          <div class="flex justify-center items-center mt-3 ">
            <button class="bg-blue-500 text-white px-4 py-2 rounded">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgetadmin;
