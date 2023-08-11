const express=require('express')
const router=express.Router()
const authmiddleware =require('../middleware/auth')
const userController =require('../controller/userController')

// router.post('/',userController.landingPageLoad)
 router.post('/register',userController.registerpage)
 router.post('/login',userController.loginpage)
router.post('/get-userinfo-id',authmiddleware,userController.userdetails)
router.post('/otp',userController.otpVerification)
router.post('/forget',userController.forgetMail)
router.post('/reset',userController.resetPassword)



 module.exports =router