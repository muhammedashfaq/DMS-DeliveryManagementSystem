import React, { useEffect, useState } from "react";
import Header from "../../../components/admin/Header";
import SideNav from "../../../components/admin/nav";
import{Routes,Route} from 'react-router-dom'
import UserDetails from '../../../components/admin/userlist'
import DriverDetails from '../../../components/admin/driverlist'
import AddDriver from "../../../components/admin/addDriver";
import AdminProfile from "../../../components/admin/adminProfile";
import DriverProfilePage from '../../../components/admin/driverProfile'
import ShipmentList from '../../../components/admin/shipmentlist'
import Services from '../../../components/admin/services'
import Trackpage from '../../../components/admin/admintrack'
import axios from "axios";
const Home = () => {

  const getData = async (req, res) => {
    try {
      const response = await axios.post(
        "/admin/get-admininfo-id",
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
    <div className=" h-screen bg-gradient-to-bl from-slate-900 via-purple-900 to-slate-900"
    
    // style={{
    //   backgroundImage: "url(./images/landingpage/track.jpg)",
    // }}
    
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





        </Routes>
      </div>


   
    </div>
  );
};

export default Home;
