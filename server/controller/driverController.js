const Driver = require("../models/driverModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { securePassword } = require("../config/nodemailer");
const shipmentModel = require("../models/shipmentModel");
const updatesModel = require("../models/shipmetUpdatesModel");

const logindriver = async (req, res) => {
  try {
    if (!req.body.employeeid || !req.body.password) {
      res.status(200).send({ message: "field required", success: false });
    }
    const idexist = await Driver.findOne({ employeeId: req.body.employeeid });
    const drivername = idexist.fname + " " + idexist.lname;
    if (idexist) {
      if (idexist.activestatus === "Active") {
        if (idexist.password === "") {
          const password = req.body.password;
          const passwordHash = await securePassword(password);
          await Driver.updateOne(
            { employeeId: req.body.employeeid },
            { $set: { password: passwordHash } }
          );

          const token = jwt.sign(
            { id: idexist._id, name: drivername },
            process.env.JWT_SECRET_DRIVER,
            {
              expiresIn: "1d",
            }
          );

          res.status(200).send({
            message: "successfully logged",
            success: true,
            data: token,
            name: drivername,
          });
        } else {
          const isMatch = await bcrypt.compare(
            req.body.password,
            idexist.password
          );
          if (!isMatch) {
            res
              .status(200)
              .send({ message: "incorrect password", success: false });
          } else {
            const token = jwt.sign(
              { id: idexist._id, name: drivername },
              process.env.JWT_SECRET_DRIVER,
              {
                expiresIn: "1d",
              }
            );

            res.status(200).send({
              message: "successfully logged",
              success: true,
              data: token,
              name: drivername,
            });
          }
        }
      } else {
        res.status(200).send({ message: "Entry Restricted", success: false });
      }
    } else {
      res.status(200).send({ message: "something error", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong", success: false });
  }
};

const driverdetails = async (req, res) => {
  try {
    const id = req.driverId;
    const user = await Driver.findOne({ _id: id });
    const City = user.city;

    if (!user) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      res.status(200).send({ message: "done", success: true, name: City });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "error getting info", success: false, error });
  }
};

const getdashboardjobs = async (req, res) => {
  try {
    const id = req.driverId;
    const hub = await Driver.findById({ _id: id });

    if (hub) {
      const shipmentdata = await shipmentModel.find({
        fromhub: hub.city,
        "shipment.shipmentStatus": { $nin: ["Delivered", "Transisted"] },
        "shipment.advanceamountStatus": true,
      });

      const transisteddata = await shipmentModel.find({
        tohub: hub.city,
        "shipment.shipmentStatus": "Transisted",
      });

      res
        .status(200)
        .send({
          message: "fetched",
          success: true,
          data: shipmentdata,
          transist: transisteddata,
        });
    } else {
      res.status(200).send({ message: "error", success: false });
    }
  } catch (error) {
    res.status(500).send({ message: "something went wrong", success: false });
  }
};

const updateShipmentStatus = async (req, res) => {
  try {
    console.log(req.body, "body");

    const { trackid, status, comments } = req.body;

    const user = await shipmentModel
      .findOne({ shipment: { $elemMatch: { trackid: trackid } } })
      .populate("shipment");

    const verifytrackid = await shipmentModel.findOne({
      shipment: { $elemMatch: { trackid: trackid } },
    });
    if (!verifytrackid) {
      res.status(200).send({ message: "TrackID NOt Valid", success: false });
    } else {
      const updatestatus = await updatesModel.findOne({ TrackID: trackid });
      if (!updatestatus) {
        const newstatus = new updatesModel({
          user: user.user,
          shipment: user._id,
          TrackID: trackid,
          status: status,
          comments: comments,
        });

        await newstatus.save();
        res.status(200).send({ message: "Updated", success: true });
      } else {
        if (status === "Shipment picked") {
          await updatesModel.findOneAndUpdate(
            { TrackID: trackid },
            {
              $set: {
                status: status,
                comments: comments,
                pickupdate: Date.now(),
              },
            }
          );
          res
            .status(200)
            .send({ message: "Updated", success: true, data: updatestatus });
        } else if (status === "Shipment Delivered") {
          console.log("ivdethy");
          const updatedUpdateStatus = await updatesModel.findOneAndUpdate(
            { TrackID: trackid },
            {
              $set: {
                status: status,
                comments: comments,
                deliverydate: Date.now(),
              },
            },
            { new: true }
          );

          if (updatedUpdateStatus) {
            await shipmentModel.findOneAndUpdate(
              {
                $and: [
                  { "shipment.trackid": trackid },
                  { "shipment.shipmentStatus": { $ne: "Delivered" } },
                ],
              },
              {
                $set: { "shipment.$.shipmentStatus": "Delivered" },
              }
            );

            res
              .status(200)
              .send({ message: "Updated", success: true, data: updatestatus });
          }
        } else {
          await updatesModel.findOneAndUpdate(
            { TrackID: trackid },
            {
              $set: {
                status: status,
                comments: comments,
              },
            }
          );
          res
            .status(200)
            .send({ message: "Updated", success: true, data: updatestatus });
        }
      }
    }
  } catch (error) {
    res.status(200).send({ message: "Someting went wrong", success: false });
  }
};

const idverify = async (req, res) => {
  try {
    const { trackid } = req.body;

    const updatestatus = await updatesModel.findOne({ TrackID: trackid });

    const verifytrackid = await shipmentModel.findOne({
      shipment: { $elemMatch: { trackid: trackid } },
    });

    if (verifytrackid) {
      res
        .status(200)
        .send({ message: "Verified", success: true, data: updatestatus });
    } else {
      res.status(200).send({ message: "Id not exist", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const approveShipment = async (req, res) => {
  try {
    const { trackid } = req.body;

    const verifytrackid = await shipmentModel.findOne({
      shipment: { $elemMatch: { trackid: trackid } },
    });

    if (verifytrackid) {
      const newstatus = new updatesModel({
        user: verifytrackid.user,
        shipment: verifytrackid._id,
        TrackID: trackid,
      });

      await newstatus.save();

      await shipmentModel.findOneAndUpdate(
        {
          $and: [
            { "shipment.trackid": trackid },
            { "shipment.shipmentStatus": { $ne: "approved" } },
          ],
        },
        {
          $set: { "shipment.$.shipmentStatus": "approved" },
        }
      );

      res.status(200).send({ message: "Updated", success: true });
    } else {
      res.status(200).send({ message: "Id not exist", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const transistshipment = async (req, res) => {
  try {
    const { trackid } = req.body;

    const verifytrackid = await shipmentModel.findOne({
      shipment: { $elemMatch: { trackid: trackid } },
    });

    if (verifytrackid) {
      const newstatus = new updatesModel({
        user: verifytrackid.user,
        shipment: verifytrackid._id,
        TrackID: trackid,
        status: "Transisted",
      });

      await newstatus.save();

      await shipmentModel.findOneAndUpdate(
        {
          $and: [
            { "shipment.trackid": trackid },
            { "shipment.shipmentStatus": { $ne: "Transisted" } },
          ],
        },
        {
          $set: { "shipment.$.shipmentStatus": "Transisted" },
        }
      );

      res.status(200).send({ message: "Updated", success: true });
    } else {
      res.status(200).send({ message: "Id not exist", success: false });
    }
  } catch (error) {}
};
module.exports = {
  logindriver,
  driverdetails,
  getdashboardjobs,
  updateShipmentStatus,
  idverify,
  approveShipment,
  transistshipment,
};
