import React from 'react'
import Header from '../../../components/admin/Header'
import SideNav from '../../../components/admin/nav'
import Body from '../../../components/admin/driverlist'
export const Drivermanagement = () => {
  return (
    <div className='w-full h-auto'>


    <Header />
    <SideNav/>
    <div className=" h-max ml-64" >
      <Body />

    </div>
  
    </div>
  )
}

export default Drivermanagement