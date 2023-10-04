import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { driverloginvalidate } from "../../Helper/Validations/validation";
import { hideloading, showloading } from "../../Helper/redux/alertSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUserContext } from "../../Helper/context/userContext";
import axios from "axios";
import "./dlogin.css";
import { RouteObjects } from "../../Routes/RouteObject";
const Login = () => {
  const { setUserName } = useUserContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setError] = useState([]);
  const [formData, setFormData] = useState({
    employeeid: "",
    password: "",
  });
  const inputchange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const error = driverloginvalidate(formData);
      setError(error);

      if (Object.keys(errors).length === 0) {
      }
      dispatch(showloading());
      const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/hub/login`, formData);
      dispatch(hideloading());

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("drivertoken", response.data.data);

        const name = response.data.name;
        setUserName(name);
        navigate(RouteObjects.HubHome);
        
      } else {
        toast.error(response.data.message);
      }
    }   catch (error) {
      dispatch(hideloading());
      toast.success("something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full filter border-2 border-black dlogin">
      <div className="bg-white shadow-2xl h-max w-96 m-5 rounded-lg border-solid border-2 border-sky-500">
        <div>
          {/* Icon */}
          <img
            className="h-20 w-auto"
            src="./images/landingpage/logo.png"
            alt="Your Company"
          />
        </div>

        <h1 className="text-center font-bold text-2xl m-2">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className=" flex justify-center relative">
            <input
              className="pr-10 bg-gray-200 my-2 w-72 h-10 rounded-sm"
              placeholder="Employee Id"
              name="employeeid"
              type="text"
              onChange={inputchange}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <FaUser className="text-gray-500" />
            </span>
          </div>
          {errors.employeeid && (
            <span className="text-red-600 ml-11">{errors.employeeid}</span>
          )}

          <div className=" flex justify-center relative">
            <input
              className="pr-10 bg-gray-200 my-2 w-72 h-10 rounded-sm"
              placeholder="Password"
              name="password"
              type="password"
              onChange={inputchange}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <FaLock className="text-gray-500" />
            </span>
          </div>
          {errors.password && (
            <span className="text-red-600 ml-11">{errors.password}</span>
          )}

          <div className="flex justify-center">
            <button className="px-9 mt-2 bg-blue-800 w-48 h-8 text-white rounded-sm">
              Login
            </button>
          </div>
        </form>

        <p className="text-center m-2">
          <a href={RouteObjects.ForgetPassword}>Forgot password</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
