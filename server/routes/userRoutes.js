const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware/auth");
const userController = require("../controller/userController");
const upload = require("../config/multer");


// router.post('/',userController.landingPageLoad)
router.post("/register", userController.registerpage);
router.post("/login", userController.loginpage);
router.post("/googlelogin", userController.googlelogin);
router.post("/otp", userController.otpVerification);
router.post("/forget", userController.forgetMail);
router.post("/reset/:token", userController.resetPassword);
router.post("/trackshipment", userController.trackshipment);


router.post("/get-userinfo-id", authmiddleware, userController.userdetails);
router.post("/get-dataprofils",authmiddleware,userController.getprofile);
router.post(
  "/updateprofileimage",
  authmiddleware,
  upload.upload.single("profileimage"),
  userController.updateProfile
);
router.post("/add_address", authmiddleware, userController.addAddress);
router.get("/getLocationData",authmiddleware, userController.getLocationData);
router.post("/bookshipment", authmiddleware, userController.bookshipment);
router.post("/advancepaymentUpdate",authmiddleware, userController.advancepaymentUpdate);

router.post("/getchathistory", userController.getchathistory);
router.post("/updateUserDetails",authmiddleware, userController.updateUserDetails);



module.exports = router;
