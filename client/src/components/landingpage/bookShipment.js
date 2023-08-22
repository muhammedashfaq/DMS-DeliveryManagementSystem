import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookShipment = () => {
  const [pagenext, setPageNext] = useState(1);
  const [fetchedCity, setfetchedCity] = useState([]);

  const handlenext = () => {
    if (pagenext === 1) {
      setPageNext((prev) => prev + 1);
    } else {
      setPageNext((prev) => prev - 1);
    }
  };

  const [selectedCity, setSelectedCity] = useState("");

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
    const savedCity = localStorage.getItem("selectedCity");

    if (savedCity) {
      setSelectedCity(savedCity);
    }
  }, []);

  const reloadPageWithCity = (newCity) => {
    setSelectedCity(newCity);

    localStorage.setItem("selectedCity", newCity);
  };

  useEffect(() => {
    localStorage.setItem("selectedCity", selectedCity);
  }, [selectedCity]);

  return (
    <div>
      <Header />

      <div className="px-8 py-2 h-40 dark:bg-gray-900 dark:text-gray-100">
        <div className="flex items-center mx-auto container justify-center md:justify-between py-2">
          <div>
            <div className="w-64">
              <div className="relative">
                <select
                  id="city"
                  name="city"
                  value={selectedCity}
                  onChange={(event) => reloadPageWithCity(event.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
                >
                  <option value="">Choose a city...</option>
                  {fetchedCity.map((city, index) => (
                    <option key={index} value={city.value}>
                      {city.city}
                    </option>
                  ))}

                  {/* Add more options here */}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
            <span>
              {selectedCity} Get up to 50% off your first order + free
              shipping,&nbsp;
            </span>
            <a href="#" rel="noopener noreferrer" className="underline">
              sign up
            </a>
            today!
          </div>
          <a
            href="#"
            rel="noopener noreferrer"
            className="items-center gap-2 hidden md:flex"
          >
            <svg
              role="img"
              viewBox="0 0 22 22"
              className="fill-current h-4 w-4"
            >
              <path
                clipRule="evenodd"
                d="M6.5 1.75a1.75 1.75 0 100 3.5h3.51a8.785 8.785 0 00-.605-1.389C8.762 2.691 7.833 1.75 6.5 1.75zm5.49 3.5h3.51a1.75 1.75 0 000-3.5c-1.333 0-2.262.941-2.905 2.111a8.778 8.778 0 00-.605 1.389zM1.75 6.75v3.5h18.5v-3.5H1.75zm18 5H21a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75h-2.761a3.25 3.25 0 00-2.739-5c-2.167 0-3.488 1.559-4.22 2.889a9.32 9.32 0 00-.28.553 9.32 9.32 0 00-.28-.553C9.988 1.809 8.667.25 6.5.25a3.25 3.25 0 00-2.739 5H1A.75.75 0 00.25 6v5c0 .414.336.75.75.75h1.25V21c0 .414.336.75.75.75h16a.75.75 0 00.75-.75v-9.25zm-1.5 0H3.75v8.5h14.5v-8.5z"
                fillRule="evenodd"
              ></path>
            </svg>
            <span className="hover:underline focus-visible:underline">
              Gift Cards
            </span>
          </a>
        </div>
      </div>

      <div className="h-max  dark:bg-gray-800 dark:text-gray-50 container mt-10">
        <form className="grid grid-cols-2">
          {pagenext === 1 && (
            <div className="p-6 flex flex-col mx-auto mt-6">
              <fieldset className="grid grid-cols-4  p-6 rounded-md shadow-sm dark:bg-gray-900">
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                  <div className="col-span-full sm:col-span-3">
                    <label for="firstname" className="text-sm">
                      First name
                    </label>
                    <input
                      id="firstname"
                      type="text"
                      placeholder="First name"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label for="lastname" className="text-sm">
                      Last name
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      placeholder="Last name"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label for="email" className="text-sm">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full">
                    <label for="address" className="text-sm">
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <label for="city" className="text-sm">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <label for="state" className="text-sm">
                      State / Province
                    </label>
                    <input
                      id="state"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <label for="zip" className="text-sm">
                      ZIP / Postal
                    </label>
                    <input
                      id="zip"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                  <div className="col-span-full sm:col-span-3">
                    <label for="username" className="text-sm">
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Username"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label for="website" className="text-sm">
                      Website
                    </label>
                    <input
                      id="website"
                      type="text"
                      placeholder="https://"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full">
                    <label for="bio" className="text-sm">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    ></textarea>
                  </div>
                </div>
              </fieldset>
            </div>
          )}
          {pagenext === 1 && (
            <div className="p-6 container flex flex-col mx-auto mt-6">
              <fieldset className="grid grid-cols-4  p-6 rounded-md shadow-sm dark:bg-gray-900">
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                  <div className="col-span-full sm:col-span-3">
                    <label for="firstname" className="text-sm">
                      First name
                    </label>
                    <input
                      id="firstname"
                      type="text"
                      placeholder="First name"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label for="lastname" className="text-sm">
                      Last name
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      placeholder="Last name"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label for="email" className="text-sm">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full">
                    <label for="address" className="text-sm">
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <label for="city" className="text-sm">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <label for="state" className="text-sm">
                      State / Province
                    </label>
                    <input
                      id="state"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <label for="zip" className="text-sm">
                      ZIP / Postal
                    </label>
                    <input
                      id="zip"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                  <div className="col-span-full sm:col-span-3">
                    <label for="username" className="text-sm">
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Username"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label for="website" className="text-sm">
                      Website
                    </label>
                    <input
                      id="website"
                      type="text"
                      placeholder="https://"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full">
                    <label for="bio" className="text-sm">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    ></textarea>
                  </div>
                </div>
              </fieldset>
            </div>
          )}

          {/* <div className='col-span-2 flex justify-center p-4'>
            {pagenext===1 && <button onClick={handlenext} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Next<span class="material-symbols-outlined  relative top-2">
navigate_next
</span></button>}
          </div>       

           */}

          {/* page2 */}
          {/* {pagenext===2 && 
      
      
     
          
      <div class="bg-white dark:bg-gray-900">
            <div class="container px-6 py-8 mx-auto">
                <h1 class="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">Simple pricing plan</h1>
                
                <p class="max-w-2xl mx-auto mt-4 text-center text-gray-500 xl:mt-6 dark:text-gray-300">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias quas magni libero consequuntur voluptatum velit amet id repudiandae ea, deleniti laborum in neque eveniet.
                </p>
                
                <div class="grid grid-cols-1 gap-8 mt-6 lg:grid-cols-3 xl:mt-12">
                    <div class="flex items-center justify-between px-8 py-4 border cursor-pointer rounded-xl dark:border-gray-700">
                        <div class="flex flex-col items-center space-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>

                            <h2 class="text-lg font-medium text-gray-700 sm:text-xl dark:text-gray-200">Basic</h2>
                        </div>
                        
                        <h2 class="text-2xl font-semibold text-gray-500 sm:text-3xl dark:text-gray-300">Free</h2>
                    </div>

                    <div class="flex items-center justify-between px-8 py-4 border border-blue-500 cursor-pointer rounded-xl">
                        <div class="flex flex-col items-center space-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600 dark:text-blue-500 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>

                            <h2 class="text-lg font-medium text-gray-700 sm:text-xl dark:text-gray-200">Standard</h2>
                        </div>
                        
                        
                        <div class="flex flex-col items-center space-y-1">
                            <div class="px-2 text-xs text-blue-500 bg-gray-100 rounded-full dark:text-blue-400 sm:px-4 sm:py-1 dark:bg-gray-700 ">
                                Save 30%
                            </div>

                            <h2 class="text-2xl font-semibold text-blue-600 dark:text-blue-500 sm:text-3xl">$99 <span class="text-base font-medium">/Yearly</span></h2>
                        </div>
                    </div>

                    <div class="flex items-center justify-between px-8 py-4 border cursor-pointer rounded-xl dark:border-gray-700">
                        <div class="flex flex-col items-center space-y-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>

                            <h2 class="text-lg font-medium text-gray-700 sm:text-xl dark:text-gray-200">Pro</h2>
                        </div>

                        <div class="flex flex-col items-center space-y-1">
                                <div class="px-2 text-xs text-blue-500 bg-gray-100 rounded-full dark:text-blue-400 sm:px-4 sm:py-1 dark:bg-gray-700 ">
                                    Save 20%
                                </div>

                                <h2 class="text-2xl font-semibold text-gray-500 sm:text-3xl dark:text-gray-300">$149 <span class="text-base font-medium">/Month</span></h2>
                            </div>
                    </div>
                </div>

                <div class="p-8 mt-8 space-y-8 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <div class="flex items-center justify-between text-gray-800 dark:text-gray-200">
                        <p class="textlg sm:text-xl">Unlimited Links</p>

                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                    </div>

                    <div class="flex items-center justify-between text-gray-800 dark:text-gray-200">
                        <p class="textlg sm:text-xl">Own analytics platfrom</p>

                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                    </div>

                    <div class="flex items-center justify-between text-gray-800 dark:text-gray-200">
                        <p class="textlg sm:text-xl">Full Support with discussion</p>

                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                    </div>

                    <div class="flex items-center justify-between text-gray-800 dark:text-gray-200">
                        <p class="textlg sm:text-xl">Optimize hashtags</p>

                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-400 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clip-rule="evenodd" />
                        </svg>
                    </div>

                    <div class="flex items-center justify-between text-gray-800 dark:text-gray-200">
                        <p class="textlg sm:text-xl">Mobile app</p>

                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                    </div>

                    <div class="flex items-center justify-between text-gray-800 dark:text-gray-200">
                        <p class="textlg sm:text-xl">Unlimited users</p>

                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-400 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                
                <div class="flex justify-center mt-8">
                    <button class="px-8 py-2 tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        Choose Plan
                    </button>
                </div>
            </div>
        </div>



} */}
          <div className="col-span-2 flex justify-center p-4">
            {pagenext === 2 && (
              <button
                onClick={handlenext}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                <span class=" relative top-2 material-symbols-outlined">
                  undo
                </span>
                Back
              </button>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BookShipment;
