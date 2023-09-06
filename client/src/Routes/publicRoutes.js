import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoutesUser = (props) => {
    if(localStorage.getItem('token')){
        return <Navigate to='/' />
    }else{
        return   props.children 
    }
}

export const PublicRoutesAdmin = (props) => {
    if(localStorage.getItem('admintoken')){
        return <Navigate to='/adminhome' />
    }else{
        return props.children 
    }
}
export const PublicRoutesdriver = (props) => {
    if(localStorage.getItem('drivertoken')){
        return <Navigate to='/hubhome' />
    }else{
        return props.children 
    }
}


