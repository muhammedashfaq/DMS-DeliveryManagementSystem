import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addressvalidate } from "../../Helper/Validations/validation";
import { Alert } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AddressModal = ({ visible, onClose }) => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    name: "",
    mobile: "",
    address: "",
    pin: "",
  });

  const [errors, setErrors] = useState([]);

  const handlechnange = (event) => {
    const { name, value } = event.target;

    setFormdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };
  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      const error = addressvalidate(formdata);
      setErrors(error);

      if (Object.keys(error).length === 0) {
        alert("done");
      }

      const response = await axios.post(`${process.env.REACT_APP_DOMAIN}/add_address`, formdata, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong");
    }
  };
  const handleClose = (e) => {
    if (e.target.id === "container") onClose();
  };
  if (!visible) return null;
  return (
    <div>
      <div
        id="container"
        onClick={handleClose}
        className={`fixed inset-0 flex justify-center items-center z-50 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
      >
        <div className="relative w-96 h-auto z-50  flex justify-center items-center shadow-lg dark:bg-gray-900 dark:text-gray-100 transform translate-x-full ease-in-out transition-transform ">
          <div className="flex items-center justify-center text-center dark:bg-gray-900 dark:text-gray-100">
            <h2 className="text-2xl font-semibold mb-4 ml-2 ">
              Update Your Address
            </h2>
            <form
              novalidate=""
              action=""
              onSubmit={handlesubmit}
              className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg dark:text-gray-100"
            >
              <label
                for="username"
                className="self-start text-xs font-semibold"
              >
                Name
              </label>
              <input
                id="username"
                type="text"
                name="name"
                onChange={handlechnange}
                className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ri dark:text-gray-900 focus:dark:border-violet-400 focus:ri"
              />
              {errors.name && (
                <Alert className="text-white" variant="filled" severity="error">
                  {errors.name}
                </Alert>
              )}
              <label
                for="username"
                className="self-start text-xs font-semibold"
              >
                Mobile Number
              </label>
              <input
                id="username"
                type="number"
                name="mobile"
                onChange={handlechnange}
                className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ri dark:text-gray-900 focus:dark:border-violet-400 focus:ri"
              />
              {errors.mobile && (
                <Alert className="text-white" variant="filled" severity="error">
                  {errors.mobile}
                </Alert>
              )}

              <label
                for="username"
                className="self-start text-xs font-semibold"
              >
                Address
              </label>
              <textarea
                rows="4"
                cols="50"
                id="username"
                type="text"
                name="address"
                onChange={handlechnange}
                className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ri dark:text-gray-900 focus:dark:border-violet-400 focus:ri"
              />
              {errors.address && (
                <Alert className="text-white" variant="filled" severity="error">
                  {errors.address}
                </Alert>
              )}
              <label
                for="password"
                className="self-start mt-3 text-xs font-semibold"
              >
                Pin
              </label>
              <input
                id="password"
                type="text"
                name="pin"
                onChange={handlechnange}
                className="flex items-center h-12 px-4 mt-2 rounded focus:outline-none focus:ri dark:text-gray-900 focus:dark:border-violet-400 focus:ri"
              />
              {errors.pin && (
                <Alert className="text-white" variant="filled" severity="error">
                  {errors.pin}
                </Alert>
              )}
              <button
                type="submit"
                className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded dark:bg-violet-400 dark:text-gray-900"
              >
                Update
              </button>
            </form>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        ></button>
      </div>
    </div>
  );
};
