import React from 'react'
import {Navigate} from "react-router-dom"


export const ProtectedRoutesUser = (props) => {


    if(localStorage.getItem('token')){
        return props.children
    }else{
        return <Navigate to='/' />
    }

  
}
export const ProtectedRoutesAdmin = (props) => {


    if(localStorage.getItem('admintoken')){
        return props.children
    }else{
        return <Navigate to='/admin' />
    }

  
}
export const ProtectedRoutesdriver = (props) => {


    if(localStorage.getItem('drivertoken')){
        return props.children
    }else{
        return <Navigate to='/hublogin' />
    }

  
}


