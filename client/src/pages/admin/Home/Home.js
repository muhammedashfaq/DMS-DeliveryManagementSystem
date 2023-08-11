import React, { useEffect } from "react";
import Header from "../../../components/admin/Header";
import SideNav from "../../../components/admin/nav";
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import UserDetails from '../../../components/admin/userlist'
import DriverDetails from '../../../components/admin/driverlist'

import axios from "axios";
const Home = () => {
  const getData = async (req, res) => {
    try {
      const response = await axios.post(
        "/get-admininfo-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  });
  return (
    <div className="w-full h-auto ">
      <Header />
      <SideNav />

      <div className=" h-max ml-64">
        <Routes>
          <Route path="/user_details" element={<UserDetails />} />
          <Route path="/driver_details" element={<DriverDetails />} />

        </Routes>
      </div>


   
    </div>
  );
};

export default Home;
