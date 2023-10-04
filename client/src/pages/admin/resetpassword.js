import React, { useState } from "react";
import { forgetValidate } from "../../Helper/Validations/validation";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { hideloading, showloading } from "../../Helper/redux/alertSlice";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BiSolidLock } from "react-icons/bi";
import { RouteObjects } from "../../Routes/RouteObject";

const Resetadmin = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const randomString = searchParams.get("randomstring");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [errors, setError] = useState([]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const error = forgetValidate(password, cpassword);
      setError(error);
      if (Object.keys(error).length === 0) {
        alert("done");
      }

      dispatch(showloading());
      const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/resetadmin/${randomString}`, {
        password: password,
        cpassword: cpassword,
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

      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="w-full  h-screen	flex justify-center 	">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-max	 w-96	m-5	rounded-lg	border-solid border-2 border-sky-500">
        <h2
          className="text-center font-semibold text-lg mt-1
"
        >
          Reset Your Rassword Here
        </h2>
        <form onSubmit={handleSubmit}>
          <div className=" mt-4 mx-4 flex items-center relative">
          <p className="absolute right-0 mr-2">
            {/* icon */}
            <BiSolidLock />
            </p>
            <input
              className="w-full	h-10 rounded-md"
              placeholder="Enter Newpassword"
              type="password"
              name="cpassword"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
        
          </div>
          {errors.password && (
              <Alert variant="filled" severity="error">
                {errors.password}
              </Alert>
            )}
          <div className=" mt-4 mx-4 flex items-center relative">
          <p className="absolute right-0 mr-2 ">
            {/* icon */}
            <BiSolidLock />
            </p>
            
            <input
              className="w-full	h-10 rounded-md"
              placeholder="Confirm Password"
              type="password"
              name="cpassword"
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
            />
        
          </div>  
          
            {errors.cpassword && (
              <Alert variant="filled" severity="error">
                {errors.cpassword}
              </Alert>
            )}
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

export default Resetadmin;
