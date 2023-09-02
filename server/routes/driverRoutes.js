const express = require("express");
const driver_router = express.Router();
const driverController = require("../controller/driverController");
const authmiddleware = require("../middleware/authdriver");

driver_router.post("/login", driverController.logindriver);
driver_router.post(
  "/get-driverinfo-id",
  authmiddleware,
  driverController.driverdetails
);
driver_router.post(
  "/getjobs",
  authmiddleware,
  driverController.getdashboardjobs
);
driver_router.post(
  "/updateShipmentStatus",
  driverController.updateShipmentStatus
);

driver_router.post("/idverify", driverController.idverify);
driver_router.post("/approveShipment", driverController.approveShipment);
driver_router.post("/transistshipment", driverController.transistshipment);

module.exports = driver_router;
