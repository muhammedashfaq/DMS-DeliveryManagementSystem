import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import * as regicon from "react-icons/io5";
import { BiEnvelope, BiSolidLock } from "react-icons/bi";
import { hideloading, showloading } from "../../Helper/redux/alertSlice";
import { Alert } from "@mui/material";
import {registervalidate} from '../../Helper/Validations/validation'
import { RouteObjects } from "../../Routes/RouteObject";

const Register = () => {
  const [errors, setError] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  
  const handleInputchange = (event) => {
    const { name, value } = event.target;
    setFormData((pformdata) => ({
      ...pformdata,
      [name]: value,
    }));

    
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const error = registervalidate(
        formData.username,
        formData.email,
        formData.password,
        formData.cpassword
      );

      setError(error);

      if (Object.values(error).every(value => value === "")) {
        dispatch(showloading());
        const response = await axios.post("http://localhost:5000/register", formData);
        dispatch(hideloading());
        
        if (response.data.success) {
          toast.success(response.data.message);
          navigate(RouteObjects.OTP);
        } else {
          toast.error(response.data.message);
        }
      }
      } catch (error) {
      dispatch(hideloading());

      console.log(error);
      toast.error("somthing went wrong");
    }
  };

  
  return (
    <section>
      <div className="relative w-96 h-max  transparent rounded-xl flex justify-center backdrop-blur-sm items-center login_border">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center text-black text-3xl font-semibold">
              Register
            </h2>
            <div className="inputbox ">
              <p className="absolute right-0 mt-4 mr-2 ">
                {" "}
                <regicon.IoPersonCircleSharp />
              </p>
              <input
                type="text"
                onChange={handleInputchange}
                name="username"
                placeholder="UserName"
              />
              {errors.name && (
                <Alert variant="filled" severity="error">
                  {errors.name}
                </Alert>
              )}
            </div>
            <div className="inputbox">
            <p className="absolute right-0 mt-4 mr-2 ">


              <BiEnvelope />
            </p>

              <input
                name="email"
                onChange={handleInputchange}
                type="text"
                placeholder="Email"
              />
              {errors.email && (
                <Alert variant="filled" severity="error">
                  {errors.email}
                </Alert>
              )}
            </div>
            <div className="inputbox ">
            <p className="absolute right-0 mt-4 mr-2">


              {/* icon */} <BiSolidLock />
            </p>
              <input
                type="password"
                onChange={handleInputchange}
                name="password"
                placeholder="password"
              />
              {errors.password && (
                <Alert variant="filled" severity="error">
                  {errors.password}
                </Alert>
              )}
            </div>
            <div className="inputbox">
            <p className="absolute right-0 mt-4 mr-2 ">


              {/* icon */}
              <BiSolidLock />
            </p>
              <input
                type="password"
                name="cpassword"
                onChange={handleInputchange}
                placeholder="Confirm password"
              />
              {errors.copassword && (
                <Alert variant="filled" severity="error">
                  {errors.copassword}
                </Alert>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-10 rounded-full bg-white border-none text-base font-semibold"
            >
              Register
            </button>
            <div className="register">
              <Link to="/">already have account ?</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
