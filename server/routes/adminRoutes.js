const express = require("express");
const admin_router = express.Router();
const authmiddleware = require("../middleware/authadmin");
const adminController = require("../controller/adminController");
const upload = require("../config/multer");

admin_router.post("/login", adminController.adminLogin);
admin_router.post("/forgetadmin", adminController.forgetMail);
admin_router.post("/resetadmin/:token", adminController.resetPassword);

admin_router.post(
  "/get-admininfo-id",
  authmiddleware,
  adminController.admindetails
);

admin_router.get("/get-useDetials",authmiddleware, adminController.userlistLoad);
admin_router.post("/blockuser", authmiddleware, adminController.blockuser);
admin_router.post("/unblockuser", authmiddleware, adminController.unblockuser);
admin_router.post(
  "/add_driver",authmiddleware,
  upload.upload.array("profileimage", 5),
  adminController.addDriver
);
admin_router.get("/getcitydetails", authmiddleware,adminController.getcitydetails);

admin_router.get("/get-driverDetials", authmiddleware,adminController.driverlistLoad);
admin_router.post("/get-profile/:id", adminController.driverProfile);
admin_router.put("/driverstatusUpdat/:id",authmiddleware, adminController.driverstatusUpdate);
admin_router.post("/addserviceCity",authmiddleware, adminController.addserviceCity);
admin_router.post("/addservicePlace",authmiddleware, adminController.addservicePlace);
admin_router.post("/deletecity",authmiddleware, adminController.deletecity);
admin_router.post("/deleteplace",authmiddleware, adminController.deleteplace);
admin_router.post("/getshipmentdata",authmiddleware, adminController.getshipmentdata);

admin_router.get("/getLocationData",authmiddleware, adminController.getLocationData);
admin_router.post("/getAllData", authmiddleware,adminController.getAllData);
admin_router.post("/updateadminprofileimage", authmiddleware,  upload.upload.single("profileimage"),
adminController.updateprofileimage);

admin_router.post("/adminReportByHub", authmiddleware,adminController.adminReportByHub);
admin_router.post("/updateadminDetails", authmiddleware,adminController.updateadminDetails);




module.exports = admin_router;
