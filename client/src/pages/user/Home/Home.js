import React, { useEffect } from 'react'
import axios from 'axios'
import Footer from '../../../components/user/footer'
import Header from '../../../components/user/Header'
const Home = () => {
  const getData =async(req,res)=>{
    try {
      
      const response =await axios.post('/get-userinfo-id',{},{
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
    <div className='w-full h-full'>
      <Header />


      {/* <Footer /> */}

    </div>
  )
}

export default Home