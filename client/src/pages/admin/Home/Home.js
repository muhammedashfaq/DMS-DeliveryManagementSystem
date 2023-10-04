import React, { useEffect, useState } from "react";
import Header from "../../../components/admin/AdminHeader";
import SideNav from "../../../components/admin/Nav";
import{Routes,Route} from 'react-router-dom'
import UserDetails from '../../../components/admin/Userlist'
import DriverDetails from '../../../components/admin/Driverlist'
import AddDriver from "../../../components/admin/AddDriver";
import AdminProfile from "../../../components/admin/AdminProfile";
import DriverProfilePage from '../../../components/admin/DriverProfile'
import ShipmentList from '../../../components/admin/Shipmentlist'
import Services from '../../../components/admin/Services'
import Trackpage from '../../../components/admin/Admintrack'
import AdminDashboard from "../../../components/admin/AdminDashboard";
import { RouteObjects } from "../../../Routes/RouteObject";
import axios from "axios";
const Home = () => {

  const getData = async (req, res) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DOMAIN}/admin/get-admininfo-id`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admintoken"),
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
    <div className=" "
    
  
    >
      <Header  />
      <SideNav />

      <div className=" h-max ml-64  ">
        <Routes>
          <Route path="/user_details" element={<UserDetails />} />
          <Route path="/driver_details" element={<DriverDetails />} />
          <Route path="/add_driver" element={<AddDriver />} />
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/driver_profile" element={<DriverProfilePage />} />
          <Route path='/shipment_list' element={<ShipmentList/> }/>
          <Route path='/services' element={<Services/> }/>
          <Route path='/admintrack' element={<Trackpage/> }/>
          <Route path='/admindashboard' element={<AdminDashboard/> }/>
          





        </Routes>

      </div>



   
    </div>
  );
};

export default Home;
