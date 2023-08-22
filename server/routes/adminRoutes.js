const express=require('express')
const admin_router=express.Router()
const authmiddleware =require('../middleware/authadmin')
const adminController =require('../controller/adminController')
const upload=require('../config/multer')




admin_router.post('/login',adminController.adminLogin)

admin_router.post('/get-admininfo-id',authmiddleware,adminController.admindetails)

admin_router.get('/get-useDetials',adminController.userlistLoad)
admin_router.post('/blockuser',authmiddleware,adminController.blockuser)
admin_router.post('/unblockuser',authmiddleware,adminController.unblockuser)
admin_router.post('/add_driver',upload.upload.array('profileimage',5), adminController.addDriver)
admin_router.get('/get-driverDetials',adminController.driverlistLoad)
admin_router.post('/get-profile/:id',adminController.driverProfile)
admin_router.put('/driverstatusUpdat/:id',adminController.driverstatusUpdate)
admin_router.post('/addserviceCity',adminController.addserviceCity)
admin_router.post('/addservicePlace',adminController.addservicePlace)




admin_router.get('/getLocationData',adminController.getLocationData)









module.exports=admin_router
