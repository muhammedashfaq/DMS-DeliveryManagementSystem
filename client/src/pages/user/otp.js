import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../redux/alertSlice";
import { Alert } from "@mui/material";

const Otp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      const error = validate(otp);
      setOtp(error);
      if (Object.keys(error).length === 0) {
        alert("done");
      }

      dispatch(showloading());
      const response = await axios.post("/otp", { otp: otp });
      dispatch(hideloading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideloading());

      console.log(error);
      toast.error("somthing went wrong");
    }
  };

  const validate = (otp) => {
    const error = {};

    if (otp.trim() === "") {
      error.otp = "otp is Required";
    } else {
      error.otp = "";
    }
    return error
  };
  return (
    <div className="w-full  h-screen	flex justify-center  	">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-56	 w-96	m-5	rounded-lg	border-solid border-2 border-sky-500">
        <h2
          className="text-center font-bold text-3xl m-2 
 "
        >
          {" "}
          OTP
        </h2>
        <p className="text-justify px-2">
          We Emailed you the OTP ,Enter the otp below and confirm
        </p>
        <form onSubmit={handlesubmit}>
          <div className="align-middle px-12 py-2">
            <input
              className="w-55	h-10 rounded-md px-4"
              placeholder="Enter OTP"
              type="text"
              name="otp"
              // value={otp}
              onChange={(e) => setOtp(e.target.value)}
              
              />
              {otp.otp && (
                  <Alert variant="filled" severity="error">
                    {otp.otp}
                  </Alert>
                )}
          </div>
          <div className="flex justify-center items-center mt-3 ">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otp;
