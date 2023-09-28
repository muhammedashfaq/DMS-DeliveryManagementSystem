import React, { useEffect, useState } from "react";
import myimage from "../../components/images/def.jpg";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../Helper/redux/alertSlice";
import { drivervalidate } from "../../Helper/Validations/validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { RouteObjects } from "../../Routes/RouteObject";
import { AddHubDetails, getCityDetails } from "./adminutil/api";

const AddDriver = () => {
  const [hubcity, sethubcity] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setError] = useState([]);
  const [image, setImage] = useState(myimage);
  const [formData, setformData] = useState({
    fname: "",
    lname: "",
    email: "",
    city: "",
    address: "",
    mobile: "",
    pin: "",
    licence: "",
    website: "",
    bio: "",
    profileimage: null,
  });

  const handleinputchange = (event) => {
    const { name, value } = event.target;
    setformData((pformData) => ({
      ...pformData,
      [name]: value,
    }));
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();


      const formDataToSend = new FormData();
      
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          formDataToSend.append(key, formData[key]);
        }
      }

      if (formData.profileimage) {
        formDataToSend.append("profileimage", formData.profileimage);
      }
      
      const error = drivervalidate(formData);
      setError(error);

      if (Object.keys(error).length === 0) {
        
        dispatch(showloading());
        const response = await AddHubDetails(formDataToSend);
        
      dispatch(hideloading());
      if (response.data.success) {
        navigate(RouteObjects.DriverList);
      } else {
        toast.error(response.data.message);
      }
    }
    } catch (error) {
      dispatch(hideloading());
      toast.error("Something went wrong");
      localStorage.removeItem("admintoken");
      navigate(RouteObjects.AdminLogin);

    }
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setformData((prevFormData) => ({
        ...prevFormData,
        profileimage: file,
      }));
    }
  };

  const fetchData = async () => {
    try {
      const response = await getCityDetails();
      if (response.data.success) {
        toast.success(response.data.message);
        const city = response.data.data;
        sethubcity(city);
      }
    } catch (error) {
      dispatch(hideloading());
      toast.error("Something went wrong");
      localStorage.removeItem("admintoken");
      navigate(RouteObjects.AdminLogin);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="p-6 bg-gray-200 dark:text-gray-50">
        <form
          enctype="multipart/form-data"
          onSubmit={formSubmit}
          novalidate=""
          action=""
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
            <div className="space-y-2 col-span-full lg:col-span-1 bg-white relative object-cover  overflow-hidden">
              <div className=" bg-gray-600 absolute bottom-0">
                <img className="h-full w-full" src={image} alt="" />{" "}
                <input
                  type="file"
                  name="profileimage"
                  className="w-full"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label for="firstname" className="text-sm">
                  First name
                </label>
                <input
                  id="firstname"
                  type="text"
                  name="fname"
                  onChange={handleinputchange}
                  placeholder="First name"
                  className="w-full h-8 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
                {errors.fname && <p className="text-red-500">{errors.fname}</p>}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label for="lastname" className="text-sm">
                  Last name
                </label>
                <input
                  id="lastname"
                  type="text"
                  name="lname"
                  onChange={handleinputchange}
                  placeholder="Last name"
                  className="w-full h-8 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
                {errors.lname && <p className="text-red-500">{errors.lname}</p>}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label for="email" className="text-sm">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleinputchange}
                  placeholder="Email"
                  className="w-full h-8 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="city" className="text-sm">
                  City
                </label>

                <select
                  id="city"
                  name="city"
                  onChange={handleinputchange}
                  className="w-full h-8 rounded-md focus:ring focus:ring-dark focus:border-gray-700 dark:text-gray-900"
                >
                  <option value="">Select City</option>
                  {hubcity.map((city, index) => (
                    <option key={index} value={city.value}>
                      {city.city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-full">
                <label for="email" className="text-sm">
                  Address
                </label>
                <textarea
                  name="address"
                  onChange={handleinputchange}
                  className="border rounded p-2 w-full h-20 resize-none text-black"
                  rows="4"
                  cols="50"
                  placeholder="Type your text here..."
                ></textarea>
                {errors.address && (
                  <p className="text-red-500">{errors.address}</p>
                )}
              </div>

              <div className="col-span-full sm:col-span-2">
                <label for="state" className="text-sm">
                  Mobile
                </label>
                <input
                  id="state"
                  type="number"
                  name="mobile"
                  onChange={handleinputchange}
                  placeholder="Mobile"
                  className="w-full h-8 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
                {errors.mobile && (
                  <p className="text-red-500">{errors.mobile}</p>
                )}
              </div>
              <div className="col-span-full sm:col-span-2">
                <label for="zip" className="text-sm">
                  PIN
                </label>
                <input
                  id="zip"
                  type="text"
                  name="pin"
                  onChange={handleinputchange}
                  placeholder="PIN"
                  className="w-full h-8 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
                {errors.pin && <p className="text-red-500">{errors.pin}</p>}
              </div>
            </div>
          </fieldset>
          <fieldset className="grid grid-cols-4 gap-6 p-3 rounded-md shadow-sm dark:bg-gray-900">
            <div className="space-y-1 col-span-full lg:col-span-1">
              <fieldset className="w-full space-y-1 dark:text-gray-100">
                {/* <label for="files" className="block text-sm font-medium">
                  Attach Your Licence
                </label> */}
                {/* <div className="flex">
                  <input
                    type="file"
                    name="fileImage"
                    id="files"
                    className="px-8 py-12 border-2 border-dashed rounded-md dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
                  />

                </div> */}
              </fieldset>
            </div>
            <div className="grid grid-cols-6 gap-2 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label for="username" className="text-sm">
                  Licence number*
                </label>
                <input
                  id="username"
                  type="text"
                  name="licence"
                  onChange={handleinputchange}
                  placeholder="Username"
                  className="w-full h-8 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label for="website" className="text-sm">
                  Website(optional)
                </label>
                <input
                  id="website"
                  type="text"
                  name="website"
                  onChange={handleinputchange}
                  placeholder="https://"
                  className="w-full h-8 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                />
              </div>
              <div className="col-span-full">
                <label for="bio" className="text-sm">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  onChange={handleinputchange}
                  placeholder="Type your text here..."
                  className="w-full h-8 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                ></textarea>
              </div>
              <div className="col-span-full">
                {/* <label for="bio" className="text-sm">
                  Photo
                </label> */}
                {/* <div className="flex items-center space-x-2">
                  <img
                    src="https://source.unsplash.com/30x30/?random"
                    alt=""
                    className="w-10 h-10 rounded-full dark:bg-gray-500 dark:bg-gray-700"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 border rounded-md dark:border-gray-100"
                  >
                    Change
                  </button>
                </div> */}
                <div className="col-span-full h-8 rounded-md sm:col-span-2 bg-blue-500 text-center">
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddDriver;
