const express=require('express')
const admin_router=express.Router()
const authmiddleware =require('../middleware/auth')
const adminController =require('../controller/adminController')

admin_router.post('/login',adminController.adminLogin)
admin_router.post('/get-admininfo-id',adminController.admindetails)
admin_router.get('/get-useDetials',adminController.userlistLoad)


module.exports=admin_router
