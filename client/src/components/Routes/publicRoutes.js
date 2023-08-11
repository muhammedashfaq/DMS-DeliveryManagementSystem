import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoutesUser = (props) => {
    if(localStorage.getItem('token')){
        return <Navigate to='/home' />
    }else{
        return   props.children 
    }
}

export const PublicRoutesAdmin = (props) => {
    if(localStorage.getItem('token')){
        return <Navigate to='/adminhome' />
    }else{
        return   props.children 
    }
}

