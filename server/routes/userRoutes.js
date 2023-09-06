const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware/auth");
const userController = require("../controller/userController");
const upload = require("../config/multer");


// router.post('/',userController.landingPageLoad)
router.post("/register", userController.registerpage);
router.post("/login", userController.loginpage);
router.post("/get-userinfo-id", authmiddleware, userController.userdetails);
router.post("/otp", userController.otpVerification);
router.post("/forget", userController.forgetMail);
router.post("/reset/:token", userController.resetPassword);
router.post("/get-dataprofils",authmiddleware,userController.getprofile);
router.post(
  "/updateprofileimage",
  authmiddleware,
  upload.upload.single("profileimage"),
  userController.updateProfile
);
router.post("/add_address", authmiddleware, userController.addAddress);
router.get("/getLocationData", userController.getLocationData);
router.post("/bookshipment", authmiddleware, userController.bookshipment);
router.post("/advancepaymentUpdate", userController.advancepaymentUpdate);
router.post("/trackshipment", userController.trackshipment);

module.exports = router;
