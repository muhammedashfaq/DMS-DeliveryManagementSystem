import React ,{useEffect}from 'react'
import Footer from '../../components/user/footer'
import Header from '../../components/driver/Header'
import Body from '../../components/driver/body'
import axios from 'axios'

const Home = () => {
  const getData =async(req,res)=>{
    try {

      const response =await axios.post('get-driverinfo-id',{},{
        headers:{
          Authorization: "Bearer " + localStorage.getItem("token"),


        }
      })

      if (response.data.success) {
      console.log(response.data.data.name);
    }
      
    } catch (error) {
      console.log(error)
      
    }

  }
  useEffect(()=>{
    getData()
  },[])
  return (
    

<div className='w-full h-full bg-slate-400'>
      <Header />
      <Body /> 

      <Footer />
    </div>



  )
}

export default Home