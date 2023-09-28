const Hub = require("../models/hubModels");
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
    const idexist = await Hub.findOne({ employeeId: req.body.employeeid });
    const drivername = idexist.fname + " " + idexist.lname;
    if (idexist) {
      if (idexist.activestatus === "Active") {
        if (idexist.password === "") {
          const password = req.body.password;
          const passwordHash = await securePassword(password);
          await Hub.updateOne(
            { employeeId: req.body.employeeid },
            { $set: { password: passwordHash } }
          );

          const token = jwt.sign(
            { id: idexist._id, name: drivername, role: "HUB" },
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
              { id: idexist._id, name: drivername, role: "HUB" },
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
    const user = await Hub.findOne({ _id: id });
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
    const hub = await Hub.findById({ _id: id });

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

      res.status(200).send({
        message: "fetched",
        success: true,
        data: shipmentdata,
        transist: transisteddata,
        hubid: hub._id,
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
    const id = req.driverId;

    const hub = await Hub.findOne({ _id: id });

    if (hub) {
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
            const updatedUpdateStatus = await updatesModel.findOneAndUpdate(
              { TrackID: trackid },
              {
                $set: {
                  status: status,
                  comments: comments,
                  deliveredBy: hub.city,
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

              res.status(200).send({
                message: "Updated",
                success: true,
                data: updatestatus,
              });
            }
          } else if (status === "Hub Recived") {
            const updatedUpdateStatus = await updatesModel.findOneAndUpdate(
              { TrackID: trackid },
              {
                $set: {
                  status: status,
                  comments: comments,
                },
              },
              { new: true }
            );

            if (updatedUpdateStatus) {
              await shipmentModel.findOneAndUpdate(
                {
                  $and: [
                    { "shipment.trackid": trackid },
                    { "shipment.shipmentStatus": { $ne: "Hub Recived" } },
                  ],
                },
                {
                  $set: { "shipment.$.shipmentStatus": "Hub Recived" },
                }
              );

              res.status(200).send({
                message: "Updated",
                success: true,
                data: updatestatus,
              });
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
    } else {
      res.status(200).send({ message: "user not Found", success: false });
    }
  } catch (error) {
    res.status(500).send({ message: "Someting went wrong", success: false });
  }
};

const idverify = async (req, res) => {
  try {
    const id = req.driverId;
    const hubdata = await Hub.findOne({ _id: id });

    if (!hubdata) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      const { trackid } = req.body;

      const verifytrackid = await shipmentModel.findOne({
        shipment: { $elemMatch: { trackid: trackid } },
      });

      if (verifytrackid) {

        const updatestatus = await updatesModel.findOne({ TrackID: trackid });

        if (updatestatus) {
          res
            .status(200)
            .send({ message: "Verified", success: true, data: updatestatus });
        } else {
          res
            .status(200)
            .send({ message: "No updates found for this ID", success: false });
        }
      } else {
        res.status(200).send({ message: "ID not found", success: false });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const approveShipment = async (req, res) => {
  try {
    const id = req.driverId;
    const hubdata = await Hub.findOne({ _id: id });

    if (!hubdata) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
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

        if (newstatus) {
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
        }
      } else {
        res.status(200).send({ message: "Id not exist", success: false });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const transistshipment = async (req, res) => {
  try {
    const id = req.driverId;
    const hub = await Hub.findOne({ _id: id });

    if (!hub) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      const { trackid, comments } = req.body;

      const verifytrackid = await shipmentModel.findOne({
        "shipment.trackid": trackid,
      });

      if (verifytrackid) {
        const updated = await updatesModel.findOneAndUpdate(
          { TrackID: trackid },
          {
            $set: {
              status: "Transisted",
              comments: comments,
            },
          },
          { new: true }
        );

        if (updated) {
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
          res.status(200).send({ message: "Update failed", success: false });
        }
      } else {
        res.status(200).send({ message: "Id not exist", success: false });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong", success: false });
  }
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
