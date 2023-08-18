const express=require('express')
const driver_router=express.Router()
const driverController=require('../controller/driverController')
const authmiddleware =require('../middleware/authdriver')


driver_router.post('/login',driverController.logindriver)
driver_router.post('/get-driverinfo-id',authmiddleware,driverController.driverdetails)



module.exports=driver_router