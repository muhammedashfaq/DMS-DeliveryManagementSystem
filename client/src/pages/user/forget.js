import { Alert } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideloading, showloading } from "../../redux/alertSlice";
import { toast } from "react-hot-toast";

const Forget = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      const response =await axios.post('/forget',{forget:forget})
      dispatch(hideloading());

      if(response.data.success){
        toast.success(response.data.message);
        navigate("/Forget2")

      }else{
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
      error.forget = "otp is Required";
    } else {
      error.forget = "";
    }
    return error;
  };

  return (
    <div className="w-full  h-screen	flex justify-center 	">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-40	 w-96	m-5	rounded-lg	border-solid border-2 border-sky-500">
        <h2
          className="text-center font-semibold text-lg mt-1
"
        >
          Forget password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className=" mt-4 mx-4">
            <input
              className="w-full	h-10 rounded-md"
              placeholder="Enter Email"
              type="email"
              name="email"
              onChange={(e) => setForget(e.target.value)}
            />
            {forget.forget && (
              <Alert variant="filled" severity="error">
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

export default Forget;
