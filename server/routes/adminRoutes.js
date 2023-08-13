const express=require('express')
const admin_router=express.Router()
const authmiddleware =require('../middleware/auth')
const adminController =require('../controller/adminController')

admin_router.post('/login',adminController.adminLogin)
admin_router.post('/get-admininfo-id',adminController.admindetails)
admin_router.get('/get-useDetials',adminController.userlistLoad)
admin_router.post('/blockuser',adminController.blockuser)
admin_router.post('/unblockuser',adminController.unblockuser)



module.exports=admin_router
