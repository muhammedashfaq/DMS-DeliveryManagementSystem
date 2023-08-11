import React, { useState } from "react";
import { forgetValidate } from "../api/validation";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideloading, showloading } from "../../redux/alertSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

const Forget2 = () => {
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

      dispatch(showloading());
      const response = await axios.post("/reset", {
        password: password,
        cpassword: cpassword,
      });
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
          <div className=" mt-4 mx-4">
            <input
              className="w-full	h-10 rounded-md"
              placeholder="Enter Newpassword"
              type="password"
              name="cpassword"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {errors.password && (
              <Alert variant="filled" severity="error">
                {errors.password}
              </Alert>
            )}
          </div>
          <div className=" mt-4 mx-4">
            <input
              className="w-full	h-10 rounded-md"
              placeholder="Confirm Password"
              type="password"
              name="cpassword"
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
            />
            {errors.cpassword && (
              <Alert variant="filled" severity="error">
                {errors.cpassword}
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

export default Forget2;
