import React, { useEffect } from "react";
import Header from "../../../components/admin/Header";
import SideNav from "../../../components/admin/nav";
import{Routes,Route} from 'react-router-dom'
import UserDetails from '../../../components/admin/userlist'
import DriverDetails from '../../../components/admin/driverlist'
import AddDriver from "../../../components/admin/addDriver";
import AdminProfile from "../../../components/admin/adminProfile";
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
    } catch (error) {
      console.log(error);
    }
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
          <Route path="/add_driver" element={<AddDriver />} />
          <Route path="/adminprofile" element={<AdminProfile />} />



        </Routes>
      </div>


   
    </div>
  );
};

export default Home;
