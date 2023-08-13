import React from 'react'

export const Modal = ({visible,onClose}) => {
    const handleClose =(e)=>{
        if(e.target.id==="container") onClose()
    }
    if(!visible) return null
  return (

    <div id='container'
    onClick={handleClose}
    className=' fixed inset-0  opacity-95 w-screen h-screen backdrop-blur-3xl flex justify-center items-center'>


        <div className='bg-black w-96 h-96'>my modal</div>

        {/* <button onClick={onClose}>X</button> */}
    </div>
  )
}

