import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import{ hideloading, showloading }from '../../redux/alertSlice' 
import axios from 'axios'
const Userlist = () => {

  const[user,setUser] = useState([])
  const dispatch=useDispatch()

  const getUserData= async()=>{

    try {
      
   
      
       dispatch(showloading())

     const response =await axios.get('/admin/get-useDetials',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
 dispatch(hideloading())
      if(response.data.message){
        setUser(response.data.data)
        console.log(response.data.data);

      }
    } catch (error) {
   dispatch(hideloading())

    }    
  }

  useEffect(()=>{
    console.log(user,"hahhaa");
  },[user])
  useEffect(()=>{
    getUserData()
  },[])
  return (
    <div className='container mt-5'>
      
<div class="relative overflow-y-auto shadow-md sm:rounded-lg ">





    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Color
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
  {user?.map((user, index) => (
    <tr key={index} className="bg-black border-b dark:bg-gray-800 dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {user.username}
      </th>
      <td className="px-6 py-4">Silver</td>
      <td className="px-6 py-4">Laptop</td>
      <td className="px-6 py-4">{user.username}</td>
      <td className="px-6 py-4">
        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
      </td>
    </tr>
  ))}
</tbody>

    </table>
</div>

    </div>
  )
}

export default Userlist