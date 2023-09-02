import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import "../../pages/user/login.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { hideloading, showloading } from "../../Helper/redux/alertSlice";
import { Alert } from "@mui/material";
import { loginValidate } from "../../Helper/Validations/validation";
import { BiEnvelope, BiSolidLock } from "react-icons/bi";
import { useUserContext } from "../../Helper/context/userContext";

// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { GoogleLogin } from "@react-oauth/google";
// import jwt_decode from 'jwt-decode'

export const LoginModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setUserName } = useUserContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setError] = useState([]);

  const handleInputchange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };















  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const errors = loginValidate(formData.email, formData.password);

      setError(errors);
      if (Object.keys(errors).length === 0) {
        alert("done");
      }
      dispatch(showloading());
      const response = await axios.post("/login ", formData);
      dispatch(hideloading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        const name = response.data.name;
        setUserName(name);
        onClose();
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading());

      console.log(error);
      toast.error("somthing went wrong");
    }
  };

  if (!visible) return null;
  return (
    <div
      id="container"
      className=" fixed inset-0 backdrop-blur-xl w-screen h-screen  flex justify-center items-center z-50"
    >
      <div className="relative w-96 h-auto z-50 bg-slate-300 bg-opacity-70 rounded-3xl flex justify-center b items-center login_border">
        <div className="form-value">
          <div className="flex justify-end mt-2">
            <button
              className="bg-white rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
          <form onSubmit={handleSubmit}>
            <div className="inputbox">
              <p className="absolute right-0 mt-4 mr-2 ">
                {/* icon */}
                <BiEnvelope />
              </p>

              <input
                placeholder="Email"
                type="text"
                name="email"
                onChange={handleInputchange}
              />

              {errors.email && (
                <Alert variant="filled" severity="error">
                  {errors.email}
                </Alert>
              )}
            </div>
            <div className="inputbox">
              <p className="absolute right-0 mt-4 mr-2 ">
                {/* icon */}
                <BiSolidLock />
              </p>
              <input
                placeholder="password"
                type="password"
                name="password"
                onChange={handleInputchange}
              />
              {errors.password && (
                <Alert variant="filled" severity="error">
                  {errors.password}
                </Alert>
              )}
            </div>
            <div className="forget">
              <label>
                <Link to="/forget"> forgot password</Link>
              </label>
            </div>
            <button className="w-full h-10 rounded-full bg-blue-950 border-none text-base  text-white font-semibold">
              Login
            </button>
            <div className="register">
              <Link to="/register">dont have account ?</Link>
            </div>
          </form>


           {/* <GoogleOAuthProvider clientId={process.env.REACT_APP_ClientID}>
            <GoogleLogin
              onSuccess={handlegoglelogin}

              onError={() => {
                console.log("Login Failed");
              }}
            />
            
          </GoogleOAuthProvider>  */}
          
          
        </div>
      </div>

      <button onClick={onClose}></button>
    </div>
  );
};
