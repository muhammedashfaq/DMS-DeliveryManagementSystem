import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { hideloading, showloading } from "../../redux/alertSlice";
import { Alert } from "@mui/material";
import { loginValidate } from "../api/validation";
import { BiEnvelope, BiSolidLock } from "react-icons/bi";
import { useUserContext} from '../../context/userContext'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setUserName } = useUserContext()
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
        const name=response.data.name
        setUserName(name)

        navigate("/home");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading());

      console.log(error);
      toast.error("somthing went wrong");
    }
  };

  return (
    <section>
      <div className="relative w-96 h-auto  transparent rounded-xl flex justify-center backdrop-blur-sm items-center login_border">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center text-black text-3xl font-semibold">
              Login
            </h2>
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
                <input type="checkbox" /> remember me
              </label>
              <label>
                <Link to="/forget"> forgot password</Link>
              </label>
            </div>
            <button className="w-full h-10 rounded-full bg-white border-none text-base font-semibold">
              Login
            </button>
            <div className="register">
              <Link to="/register">dont have account ?</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
