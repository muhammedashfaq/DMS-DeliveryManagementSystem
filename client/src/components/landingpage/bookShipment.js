import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import { bookshipmentvalidation } from "../../pages/api/validation";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookShipment = () => {
  const navigate =useNavigate()
  const [selectedCity, setSelectedCity] = useState("");
  const [toselectedCity, settoSelectedCity] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
const [toselectedPlace, settoSelectedPlace] = useState("");


  const [pagenext, setPageNext] = useState(1);
  const [fetchedCity, setfetchedCity] = useState([]);
  const [errors, setErrors] = useState([]);
  const [formdata, setformdata] = useState({
    fromcity:"",
    fromplace:"",
    tocity:"",
    toplace:"",
    fromname: "",
    frommobile: "",
    frompin: "",
    fromaddress: "",
    fromdescription: "",
    toname: "",
    tomobile: "",
    toaddress: "",
    topin: "",
  });
  const handlechangeinput = (event) => {
    const { name, value } = event.target;
    setformdata((pformdata) => ({
      ...pformdata,
      [name]: value,
      fromcity: selectedCity,
    fromplace: selectedPlace,     
    tocity: toselectedCity,
    toplace: toselectedPlace, 
    }));
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();

      const error = bookshipmentvalidation(formdata);
      setErrors(error);

      if (Object.keys(error).length === 0) {
        alert("done");
      }

      const response = await axios.post("/bookshipment", formdata, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });


      if(response.data.success){
        toast.success(response.data.message)
        navigate('/userProfile')


      }else{
        toast.error(response.data.message)


      }
    } catch (error) {
      toast.error("seomthing went wrong")

    }
  };

  const handlenext = () => {
    if (pagenext === 1) {
      setPageNext((prev) => prev + 1);
    } else {
      setPageNext((prev) => prev - 1);
    }
  };

  const getData = async (req, res) => {
    try {
      const response = await axios.get("/getLocationData");
      if (response.data.success) {
        toast.success(response.data.message);
        const city = response.data.data;
        setfetchedCity(city);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header />

      <div className="px-8 py-2 h-40 dark:bg-gray-900 dark:text-gray-100">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  mx-auto container  md:justify-between py-2">
          <div className="grid grid-cols-3 gap-4 m-6  ">
            <h1>Service Avaliable:</h1>

            {fetchedCity.map((city, index) => (
              <div key={index} className=" border-yellow-800 border-b-4">
                {city.city}
              </div>
            ))}
          </div>

          <div>
            <span className="border-yellow-600 border-b-2 ">
              Weight realted details
            </span>

            <ul className="m-3">
              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-violet-400"
                >
                  <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                  <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
                </svg>
                <span>test</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-violet-400"
                >
                  <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                  <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
                </svg>
                <span>test </span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-violet-400"
                >
                  <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                  <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
                </svg>
                <span>test</span>
              </li>
            </ul>
          </div>

          <div>
            <span className="border-yellow-600 border-b-2 ">
              Price related details
            </span>

            <ul className="m-3">
              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-violet-400"
                >
                  <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                  <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
                </svg>
                <span>test</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-violet-400"
                >
                  <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                  <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
                </svg>
                <span>test </span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current dark:text-violet-400"
                >
                  <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                  <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
                </svg>
                <span>test</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <form className="container" onSubmit={formSubmit}>
        <div className="h-max  dark:bg-gray-800 dark:text-gray-50 container mt-10">
          <div className="grid grid-cols-2">
            <div className="p-6 flex flex-col mx-auto mt-6">
              <div>
                <h1 className="text-white ">From</h1>
              </div>
              <fieldset className="grid grid-cols-4  p-6 rounded-md shadow-sm dark:bg-gray-900">
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                  <div className="col-span-full sm:col-span-3">
                    <label for="lastname" className="text-sm ">
                      Avaliable Cities
                    </label>
                    <select
                      id="city"
                      name="fromcity"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="block appearance-none w-full mt-2 bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Choose a city...</option>
                      {fetchedCity.map((city, index) => (
                        <option key={index} value={city.value}>
                          {city.city}
                        </option>
                      ))}

                      {/* Add more options here */}
                    </select>
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <div>
                      <label for="lastname" className="text-sm">
                        Choose place
                      </label>
                      <select name="fromplace"   value={selectedPlace}
  onChange={(e) => setSelectedPlace(e.target.value)} className="border rounded p-2 mb-2 mt-2 shadow-sm w-full text-black">
                        <option value="">Select a place</option>
                        {fetchedCity.map(
                          (data, index) =>
                            data.city === selectedCity &&
                            data.place.map((place, placeIndex) => (
                              <option key={placeIndex} value={place}>
                                {place}
                              </option>
                            ))
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label for="firstname" className="text-sm">
                      Name
                    </label>
                    <input
                      id="firstname"
                      type="text"
                      placeholder="Name"
                      name="fromname"
                      onChange={handlechangeinput}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                    {errors.fromname && (
                      <p className="text-red-500">{errors.fromname}</p>
                    )}
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label for="lastname" className="text-sm">
                      Contact Number
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      placeholder="mobile"
                      name="frommobile"
                      onChange={handlechangeinput}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                    {errors.frommobile && (
                      <p className="text-red-500">{errors.frommobile}</p>
                    )}
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label for="lastname" className="text-sm">
                      PIN
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      placeholder="pin"
                      name="frompin"
                      onChange={handlechangeinput}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                    {errors.frompin && (
                      <p className="text-red-500">{errors.frompin}</p>
                    )}
                  </div>

                  <div className="col-span-full">
                    <label for="bio" className="text-sm">
                      Address
                    </label>
                    <textarea
                      id="bio"
                      placeholder="Type Here...."
                      name="fromaddress"
                      onChange={handlechangeinput}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    ></textarea>
                    {errors.fromaddress && (
                      <p className="text-red-500">{errors.fromaddress}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                  <div className="col-span-full">
                    <label for="bio" className="text-sm">
                      Description
                    </label>
                    <textarea
                      id="bio"
                      placeholder="Type Here...."
                      name="fromdescription"
                      onChange={handlechangeinput}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    ></textarea>
                    {errors.fromdescription && (
                      <p className="text-red-500">{errors.fromdescription}</p>
                    )}
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="p-6 container flex flex-col mx-auto mt-6">
              <div>
                <h1 className="text-white ">To</h1>
              </div>
              <fieldset className="grid grid-cols-4  p-6 rounded-md shadow-sm dark:bg-gray-900">
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                  <div className="col-span-full sm:col-span-3">
                    <label for="lastname" className="text-sm ">
                      Avaliable Cities
                    </label>

                    <select
                      id="city"
                      name="tocity"
                      value={toselectedCity}
                      onChange={(e) => settoSelectedCity(e.target.value)}
                      className="block appearance-none mt-2 w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Choose a city...</option>
                      {fetchedCity.map((city, index) => (
                        <option key={index} value={city.value}>
                          {city.city}
                        </option>
                      ))}

                      {/* Add more options here */}
                    </select>
                  </div>

                  <div className="col-span-full sm:col-span-3">
                    <label for="lastname" className="text-sm">
                      Choose place
                    </label>
                    <select name="toplace"  value={toselectedPlace}
  onChange={(e) => settoSelectedPlace(e.target.value)} className="border rounded p-2 mb-2 mt-2 shadow-sm w-full text-black">
                      <option value="">Select a place</option>
                      {fetchedCity.map(
                        (data, index) =>
                          data.city === toselectedCity &&
                          data.place.map((place, placeIndex) => (
                            <option key={placeIndex} value={place}>
                              {place}
                            </option>
                          ))
                      )}
                    </select>
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label for="email" className="text-sm">
                      Name
                    </label>
                    <input
                      id="email"
                      type="Name"
                      placeholder="Name"
                      name="toname"
                      onChange={handlechangeinput}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                    {errors.toname && (
                      <p className="text-red-500">{errors.toname}</p>
                    )}
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label for="email" className="text-sm">
                      Contact Number
                    </label>
                    <input
                      id="email"
                      type="number"
                      placeholder="Mobile"
                      name="tomobile"
                      onChange={handlechangeinput}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                    {errors.tomobile && (
                      <p className="text-red-500">{errors.tomobile}</p>
                    )}
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label for="lastname" className="text-sm">
                      PIN
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      placeholder="pin"
                      name="topin"
                      onChange={handlechangeinput}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                    {errors.topin && (
                      <p className="text-red-500">{errors.topin}</p>
                    )}
                  </div>
                  <div className="col-span-full">
                    <label for="bio" className="text-sm">
                      Address
                    </label>
                    <textarea
                      id="bio"
                      placeholder="Type Here..."
                      name="toaddress"
                      onChange={handlechangeinput}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    ></textarea>
                    {errors.toaddress && (
                      <p className="text-red-500">{errors.toaddress}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3"></div>
              </fieldset>
            </div>

            <div className="col-span-2 flex justify-center p-4">
              {/* {pagenext === 1 && (
                <button
                  onClick={handlenext}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Next
                  <span class="material-symbols-outlined  relative top-2">
                    navigate_next
                  </span>
                </button>
              )} */}
            </div>

            <div className="col-span-2 flex justify-center p-4">
              {/* {pagenext === 2 && (
                <button
                  onClick={handlenext}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  <span class=" relative top-2 material-symbols-outlined">
                    undo
                  </span>
                  Back
                </button>
              )} */}
            </div>
          </div>
          {/* page2 */}

          {/* {pagenext === 2 && (
            <div className="container ">
              <div>
                <h1 className="text-white ">courier details</h1>
              </div>
              <fieldset className=" p-6 rounded-md shadow-sm dark:bg-gray-900">
                <div className="grid grid-cols-6 gap-4 col-span-full">
                 
                 
                  <div className="col-span-full ">
                    <label for="email" className="text-sm">
                      Name
                    </label>
                    <input
                      id="email"
                      type="Name"
                      placeholder="Name"
                      name="toname"
                      onChange={handlechangeinput}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                    {errors.toname && (
                      <p className="text-red-500">{errors.toname}</p>
                    )}
                  </div>
                  <div className="col-span-full ">
                    <label for="email" className="text-sm">
                      Contact Number
                    </label>
                    <input
                      id="email"
                      type="number"
                      placeholder="Mobile"
                      name="tomobile"
                      onChange={handlechangeinput}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                    {errors.tomobile && (
                      <p className="text-red-500">{errors.tomobile}</p>
                    )}
                  </div>
                  <div className="col-span-full">
                    <label for="bio" className="text-sm">
                      Address
                    </label>
                    <textarea
                      id="bio"
                      placeholder="Type Here..."
                      name="toaddress"
                      onChange={handlechangeinput}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    ></textarea>
                    {errors.toaddress && (
                      <p className="text-red-500">{errors.toaddress}</p>
                    )}
                  </div>
                  
                </div>

                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3"></div>
              </fieldset>
            </div>
          )} */}

          <button className=" bg-blue-600 w-full h-14 mt-10">Submit</button>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default BookShipment;
