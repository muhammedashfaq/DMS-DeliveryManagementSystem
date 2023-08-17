const express=require('express')
const admin_router=express.Router()
const authmiddleware =require('../middleware/auth')
const adminController =require('../controller/adminController')
const upload=require('../config/multer')





admin_router.post('/login',adminController.adminLogin)
admin_router.post('/get-admininfo-id',adminController.admindetails)
admin_router.get('/get-useDetials',adminController.userlistLoad)
admin_router.post('/blockuser',authmiddleware,adminController.blockuser)
admin_router.post('/unblockuser',authmiddleware,adminController.unblockuser)
admin_router.post('/add_driver',upload.upload.array('profileimage',5), adminController.addDriver)
admin_router.get('/get-driverDetials',adminController.driverlistLoad)




module.exports=admin_router
