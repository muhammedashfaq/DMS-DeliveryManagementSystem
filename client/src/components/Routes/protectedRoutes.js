import React from 'react'
import {Navigate} from "react-router-dom"


const ProtectedRoutes = (props) => {

    console.log('aaaaaaaa');

    if(localStorage.getItem('token')){
        return props.children
    }else{
        return <Navigate to='/login' />
    }

  
}

export default ProtectedRoutes