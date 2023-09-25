import React from 'react'
import { Navigate } from 'react-router-dom'
import { RouteObjects } from './RouteObject'

export const PublicRoutesUser = (props) => {
    if(localStorage.getItem('token')){
        return <Navigate to='/' />
    }else{
        return   props.children 
    }
}

export const PublicRoutesAdmin = (props) => {
    if(localStorage.getItem('admintoken')){
        return <Navigate to={RouteObjects.AdminDashboard} />
    }else{
        return props.children 
    }
}
export const PublicRoutesdriver = (props) => {
    if(localStorage.getItem('drivertoken')){
        return <Navigate to={RouteObjects.HubHome} />
    }else{
        return props.children 
    }
}


