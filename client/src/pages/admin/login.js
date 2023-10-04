import React, { useState } from "react";
import "./Alogin.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { adminloginvalidate } from "../../Helper/Validations/validation";
import { Alert } from "@mui/material";
import { useUserContext } from "../../Helper/context/userContext";
import { RouteObjects } from "../../Routes/RouteObject";

const Login = () => {
  const { setUserName } = useUserContext()

  const navigate = useNavigate();
  const [errors, seterrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputchange = (event) => {
    const { name, value } = event.target;
    setFormData((predata) => ({
      ...predata,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const error = adminloginvalidate(formData.email, formData.password);
      seterrors(error);
      if (Object.keys(errors).length === 0) {
      }
      const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/admin/login`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("admintoken", response.data.data);
        const name=response.data.name
        setUserName(name)
        navigate(RouteObjects.AdminDashboard);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("somthing went wrong");
    }
  };
  return (
    <div className="w-screen h-screen alogin flex flex-col sm:flex-row alogin 	">
      <div className="w-96  sm:w-1/2 h-1/3 sm:h-screen flex justify-center items-center">
        <img src="./images/adminlogin/logo.png" />
      </div>

      <div className="w-full sm:w-1/2 h-2/3 sm:h-screen flex justify-center items-center  ">
        <div className="bg-white shadow-2xl w-11/12 sm:w-96 m-5 rounded-lg border-solid border-2 border-sky-500 p-4 " >
          <h1 className="text-center font-bold text-2xl mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="my-3 ">
              <span className="flex items-center">
                <FaEnvelope className="text-gray-500 mr-2" />
                <input
                  className="pl-2 bg-gray-200 w-full h-8 rounded-sm"
                  placeholder="Email Id"
                  name="email"
                  type="email"
                  onChange={handleInputchange}
                />
              </span>
                {errors.email && (
                  <Alert variant="filled" severity="error">
                    {errors.email}
                  </Alert>
                )}
            </div>

            <div className="my-3  ">
              <span className="flex items-center">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  className="pl-2 bg-gray-200 w-full h-8 rounded-sm"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleInputchange}
                />
              </span>
                {errors.password && (
                  <Alert variant="filled" severity="error">
                    {errors.password}
                  </Alert>
                )}
              <Link to={RouteObjects.AdminForget}><span className="ml-6 text-sm
		 ">Forget password</span></Link>
                  
            </div>
            <div className="flex justify-center">
              <button className="mt-4 px-9 bg-blue-800 w-full sm:w-48 h-8 text-white rounded-sm">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
