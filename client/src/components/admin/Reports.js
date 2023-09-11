import React, { useEffect, useState } from "react";
import { adminRequest } from "../../Helper/interceptor/axois";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate = useNavigate();
  const [hub, setHub] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All");

  const fetchDataByHub = async (city) => {
    adminRequest({
      url: "/admin/adminReportByHub",
      method: "POST",
      data: {city:city}
    })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
        localStorage.removeItem("admintoken");
        navigate("/admin");
      });
  };

  const gethubdata = async () => {
    adminRequest({
      url: "/getLocationData",
      method: "get",
    })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          const hubcity = response.data.data;
          setHub(hubcity);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
        localStorage.removeItem("admintoken");
        navigate("/admin");
      });
  };

  const handleCitySelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedCity(selectedValue);
    fetchDataByHub(selectedValue);
  };

  useEffect(() => {
    gethubdata();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="border-1 border-sky-100 rounded-md p-2 flex justify-center mt-10">
          <select
            className="w-40 bg-gray-200 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
            onChange={handleCitySelect}
            value={selectedCity}
          >
            <option value="All">-- All --</option>
            {hub.map((hubItem, i) => (
              <option key={i} value={hubItem.city}>
                {hubItem.city}
              </option>
            ))}
          </select>
        </div>
      </div>



      
      <p>Selected City: {selectedCity}</p>
    </div>
  );
};

export default Reports;
