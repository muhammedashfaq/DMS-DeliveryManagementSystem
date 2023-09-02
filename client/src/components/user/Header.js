import React from 'react'
import { useDispatch } from 'react-redux'
import {Navigate, useNavigate,Link,useLocation} from 'react-router-dom'
import { hideloading, showloading } from "../../Helper/redux/alertSlice";

import{useUserContext } from '../../Helper/context/userContext'

const Header = () => {
	const {userName} =useUserContext()

	const location =useLocation()

	const menu=[
		{
			name:"Track",
			path:"/track",
		
		},
		{
			name:"BookShipment",
			path:"/book",
		
		},
		{
			name:"Contact",
			path:"/contact",
		
		},

	]
    const dispatch=useDispatch()

    const navigate=useNavigate()
  return (
<header className="p-1 bg-blue-950 dark:text-gray-100 h-20">
	<div className="container flex justify-between h-16 mx-auto">
    <img src='./images/adminlogin/logo.png' />

		<ul className="items-stretch hidden space-x-1 md:flex  ">

			{menu?.map((menuitem)=>{
				const isActive = location.pathname===menuitem.path
				return(

			<li className="flex">
				<Link to={menuitem.path}  rel="noopener noreferrer" href="#" className={`flex items-center px-4 -mb-1  border-b-4 border-white font-semibold ${isActive && "border-b-4 border-white font-semibold"}`}>{menuitem.name}</Link>
			</li>
				)
			})}
 {/* <div className="user-info">
        Welcome, {userName}
      </div> */}
			
			<li className="flex">
				<a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent" onClick={()=>{localStorage.clear()
                    
                    
                    dispatch(showloading())
                    navigate('/login')
                    dispatch(hideloading())
                    
                    
                    
                    }}>Logout</a>
			</li>
          
		</ul>
		<button className="flex justify-end p-4 md:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		</button>
	</div>
</header>   )
}

export default Header