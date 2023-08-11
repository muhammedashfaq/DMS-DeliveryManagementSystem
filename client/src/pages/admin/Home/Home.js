import React, { useEffect } from 'react'
import Header from '../../../components/admin/Header'
import SideNav from '../../../components/admin/nav'
import axios from 'axios'
const Home = () => {

  const getData =async(req,res)=>{
    try {
      
      const response =await axios.post('/get-admininfo-id',{},{
        headers: {
          Authorization: "Bearer "+ localStorage.getItem("token")
        }
      })
      console.log(response.data);
    } catch (error) {
      
    }

  }


  useEffect(()=>{
    getData()
  })
  return (
    <div className='w-full h-auto '>
        <Header />
        <SideNav />
       



    </div>

  )
}

export default Home