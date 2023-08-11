const express=require('express')
const admin_router=express.Router()
const authmiddleware =require('../middleware/auth')
const adminController =require('../controller/adminController')

admin_router.post('/login',adminController.adminLogin)
admin_router.post('/get-admininfo-id',adminController.admindetails)



module.exports=admin_router
