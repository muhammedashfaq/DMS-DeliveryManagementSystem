import React, { useEffect, useState } from "react";
import axios from "axios";
import { bookshipmentvalidation } from "../../Helper/Validations/validation";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../Helper/interceptor/axois";
import { RouteObjects } from "../../Routes/RouteObject";
import { bookshipmentform, getlocation } from "./Userutil/api";
import { useDispatch } from "react-redux";
import { hideloading, showloading } from "../../Helper/redux/alertSlice";

const BookShipment = () => {
  const dispatch = useDispatch();

  const rupeeSymbol = "\u20B9";
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("");
  const [toselectedCity, settoSelectedCity] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [toselectedPlace, settoSelectedPlace] = useState("");
  const [fetchedCity, setfetchedCity] = useState([]);
  const [errors, setErrors] = useState([]);
  const [formdata, setformdata] = useState({
    fromcity: "",
    fromplace: "",
    tocity: "",
    toplace: "",
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

      
      if (Object.values(error).every(value => value === "")) {
        dispatch(showloading());

        const response = await bookshipmentform(formdata)
        dispatch(hideloading());

        if (response.data.success) {
          razorpayPayment(response.data.data, response.data.id);
          
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } 
        
    } catch (error) {
      dispatch(hideloading());

      toast.error("seomthing went wrong");
        console.log(error);
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    
  function razorpayPayment(order, id) {
    var options = {
      key: process.env.REACT_APP_Razorid,
      amount: order.advanceamount * 100,
      currency: "INR",
      name: "HL ENTERPRISES",
      description: "Pay Your Advance Amount Here",
      image: "./images/langingpage/logo.png",
      order_id: order.id,
      handler: function (response) {
        verifyPayment(response, order, id);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  const verifyPayment = (payment, order, id) => {
    PaymentUpdate(payment, order, id);
  };

  const PaymentUpdate = async (payment, order, id) => {
    try {
      userRequest({
        url: `${process.env.REACT_APP_DOMAIN}/advancepaymentUpdate`,
        method: "post",
        data: {
          payment: payment,
          order: order,
          id: id,
        },
      })
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message);

            navigate(RouteObjects.UserProfile);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((err) => {
          toast.error("something went wrong");
          console.log(err);
          localStorage.removeItem("token");
          navigate("/");
        });
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const getData = async (req, res) => {
    try {
        const response = await getlocation()

        if (response.data.success) {
          toast.success(response.data.message);
          const city = response.data.data;
          setfetchedCity(city);
        } else {
          toast.error(response.data.message);
        }

    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
      localStorage.removeItem("token");
      navigate("/");
    }
    
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="px-8 py-2 dark:bg-gray-900 dark:text-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto container md:justify-between py-2">
          <div className="col-span-1 md:col-span-1 lg:col-span-1 grid grid-cols-3 gap-4 m-6">
            <h1 className="col-span-3">Service Available Cities:</h1>
            {fetchedCity.map((city, index) => (
              <div
                key={index}
                className="col-span-1 border-yellow-800 border-b-4"
              >
                {city.city}
              </div>
            ))}
          </div>

          <div className=" flex justify-between items-center col-span-1 md:col-span-1 lg:col-span-2 border-l-2 border-l-slate-500  bg-gradient-to-r from-gray-900  overflow-hidden">
            <div>
              <span className="border-yellow-600 border-b-2 py-2 ml-10">
                Weight & fare related details{" "}
              </span>{" "}
              <div className="w-auto h-auto m-4">
                <ul className=" leading-6">
                  <li className="flex items-center space-x-2   ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current dark:text-violet-400"
                    >
                      <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                      <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
                    </svg>
                    <span>
                      Each Booking requires an advance payment of {rupeeSymbol}
                      100.
                    </span>
                  </li>
                  <li className="flex items-center space-x-2  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current dark:text-violet-400"
                    >
                      <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                      <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
                    </svg>
                    <span>The advance payment is non-refundable.</span>
                  </li>{" "}
                  <li className="flex items-center space-x-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current dark:text-violet-400"
                    >
                      <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                      <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
                    </svg>
                    <span>
                      Shipment fare will be calculated at the time of pickup.
                    </span>
                  </li>
                  <li className="flex items-center space-x-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current dark:text-violet-400"
                    >
                      <path d="M426.072,86.928A238.75,238.75,0,0,0,88.428,424.572,238.75,238.75,0,0,0,426.072,86.928ZM257.25,462.5c-114,0-206.75-92.748-206.75-206.75S143.248,49,257.25,49,464,141.748,464,255.75,371.252,462.5,257.25,462.5Z"></path>
                      <polygon points="221.27 305.808 147.857 232.396 125.23 255.023 221.27 351.063 388.77 183.564 366.142 160.937 221.27 305.808"></polygon>
                    </svg>
                    <span>
                      Additional charges may apply for shipments with special
                      requirements
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-1/2 h-40 opacity-60 ">
              <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
                <h2 className="text-xl font-semibold leadi tracki">
                  “The information about package is as important as the delivery
                  of the package itself.”
                </h2>
                {/* <p className="flex-1 dark:text-gray-400">Vero mollitia, accusantium deserunt fugiat obcaecati aperiam a, libero soluta asperiores sed quis incidunt.</p> */}
                <div className="flex flex-col justify-between gap-6 mt-6 sm:flex-row"></div>
              </div>
            </div>
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
                    </select>
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <div>
                      <label for="lastname" className="text-sm">
                        Choose place
                      </label>
                      <select
                        name="fromplace"
                        value={selectedPlace}
                        onChange={(e) => setSelectedPlace(e.target.value)}
                        className="border rounded p-2 mb-2 mt-2 shadow-sm w-full text-black"
                      >
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
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 pl-4"
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
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 pl-4"
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
                      placeholder="PIN"
                      name="frompin"
                      onChange={handlechangeinput}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 pl-4"
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
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 pl-4 pt-2"
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
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 pl-4 pt-2"
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
                    </select>
                  </div>

                  <div className="col-span-full sm:col-span-3">
                    <label for="lastname" className="text-sm">
                      Choose place
                    </label>
                    <select
                      name="toplace"
                      value={toselectedPlace}
                      onChange={(e) => settoSelectedPlace(e.target.value)}
                      className="border rounded p-2 mb-2 mt-2 shadow-sm w-full text-black"
                    >
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
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 pl-4"
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
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 pl-4"
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
                      placeholder="PIN"
                      name="topin"
                      onChange={handlechangeinput}
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 pl-4 "
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
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 pl-4 pt-2"
                    ></textarea>
                    {errors.toaddress && (
                      <p className="text-red-500">{errors.toaddress}</p>
                    )}
                  </div>
                </div>
              </fieldset>

              <div className="flex justify-end ">
                <div className="flex flex-col max-w-md space-y-4 divide-y sm:w-96 sm:p-10 divide-gray-700 dark:bg-gray-900 dark:text-gray-100">
                  <h2 className="text-2xl font-semibold">Shipmant Charges</h2>

                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Advance Amount</span>
                      <span>{rupeeSymbol}100</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <span>Delivery fee</span>
                        <span class="material-symbols-outlined ml-2">info</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-between">
                        <span>Total</span>
                        <span className="font-semibold">{rupeeSymbol}100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className=" bg-blue-600 w-full h-14 mt-10">
                Pay & Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookShipment;
