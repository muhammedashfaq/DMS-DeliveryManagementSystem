import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CityPlaces = () => {
  const [city, setCity] = useState("");
  const [place, setPlcae] = useState("");
  const [fetchedCity, setfetchedCity] = useState([]);
  const [selectedcity, setSelectedcity] = useState("");

  const submitcityform = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post("/admin/addserviceCity", {
        city: city,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload();
        getData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.success("something wrong");
    }
  };

  const submitplaceform = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post("/admin/addservicePlace", {
        place: place,
        city: selectedcity,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        window.location.reload();
        getData();
      } else {
        toast.error(response.data.success);
      }
    } catch (error) {
      console.log(error);
      toast.success("something wrong");
    }
  };

  const getData = async (req, res) => {
    try {
      const response = await axios.get("/admin/getLocationData");
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
  const [active, setActive] = useState(false);
  const [activeplace, setActiveplace] = useState(false);

  const handleToggle = (targetState, setTargetState) => {
    setTargetState(!targetState);
  };

  return (
    <div className="container mt-8 ">
      <div className="py-6 dark:bg-gray-600 dark:text-gray-50 rounded-lg">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6">
            <h1>ADD CITY</h1>

            <form onSubmit={submitcityform}>
              <div className="w-96 h-28   flex items-center relative">
                <span
                  className="material-symbols-outlined absolute text-white cursor-pointer"
                  onClick={() => handleToggle(active, setActive)}
                >
                  add_circle
                </span>
                {active && (
                  <fieldset className="w-full space-y-2 ml-10 dark:text-gray-100 relative">
                    <input
                      type="text"
                      name="city"
                      placeholder="City Name"
                      onChange={(e) => setCity(e.target.value)}
                      className="w-80 h-9 flex rounded-md dark:border-gray-700 dark:text-gray-100 dark:bg-gray-800 focus:ri"
                    />
                  </fieldset>
                )}
                {active && (
                  <button className="material-symbols-outlined absolute top-11 right-0 cursor-pointer">
                    task_alt
                  </button>
                )}
              </div>
            </form>

            <div className="flex justify-between">
              <h1 className="mb-4 text-xl font-semibold">Select a City</h1>
              {selectedcity && (
                <button className="material-symbols-outlined  mb-4 ">
                  delete
                </button>
              )}
            </div>
            <select
              id="citySelect"
              value={selectedcity}
              onChange={(e) => {
                setSelectedcity(e.target.value);
              }}
              className=" text-black  w-full px-4 py-2 rounded-md shadow-sm focus:ring focus:ring-dark:bg-gray-800  "
            >
              <option value="">Choose a city...</option>

              {fetchedCity.map((city, index) => (
                <option key={index} value={city.value}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>

          <div className="py-6 md:py-0 md:px-6">
            <h1> Add Places in {selectedcity}</h1>

            <form onSubmit={submitplaceform}>
              <div className="w-96 h-28   flex items-center relative">
                <span
                  className="material-symbols-outlined absolute text-white cursor-pointer"
                  onClick={() => handleToggle(activeplace, setActiveplace)}
                >
                  add_circle
                </span>
                {activeplace && selectedcity && (
                  <fieldset className="w-full space-y-2 ml-10 dark:text-gray-100 relative">
                    <input
                      type="text"
                      name="Place"
                      placeholder="Place Name"
                      onChange={(e) => setPlcae(e.target.value)}
                      className="w-80 h-9 flex rounded-md dark:border-gray-700 dark:text-gray-100 dark:bg-gray-800 focus:ri"
                    />
                  </fieldset>
                )}
                {activeplace && selectedcity && (
                  <button className="material-symbols-outlined absolute top-11 right-0 cursor-pointer">
                    task_alt
                  </button>
                )}
              </div>
            </form>
            <h1 className="mb-4 text-xl font-semibold">
              {/* Places in {selectedCity} */}
            </h1>

            <div className=" dark:border-gray-700 h-40 overflow-y-scroll py-6 md:py-0 md:px-6 ">
              {fetchedCity.map((data, index) => (
                <div key={index}>
                  {data.city === selectedcity
                    ? data.place.map((place, placeIndex) => (
                        <div
                          key={placeIndex}
                          className="border rounded p-2 mb-2 mt-2 shadow-sm flex justify-between"
                        >
                          {place}{" "}
                          <span class="material-symbols-outlined">delete</span>
                        </div>
                      ))
                    : ""}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPlaces;
