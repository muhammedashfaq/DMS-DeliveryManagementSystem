const express = require("express");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Hub = require("../models/hubModels");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const service = require("../models/servicesModel");
const shipmentupdates = require("../models/shipmetUpdatesModel");

const { sendmailtoDriver,sendadminForgetymail } = require("../config/nodemailer");
const shipmentModel = require("../models/shipmentModel");

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

const adminLogin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .send({ message: "Email and password are required.", success: false });
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(200).send({ message: "user not exist", success: false });
    } else if (user.isAdmin) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        res.status(200).send({ message: "incorrect password", success: false });
      } else {
        const token = jwt.sign(
          { id: user._id, name: user.username, role: "ADMIN" },
          process.env.JWT_SECRET_ADMIN,
          {
            expiresIn: "1d",
          }
        );

        res.status(200).send({
          message: "logged",
          success: true,
          data: token,
          name: user.username,
        });
      }
    } else {
      res.status(200).send({ message: "user not verified", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong", success: false });
  }
};

const forgetMail = async (req, res) => {
  try {
    const token = req.body.token;
    if (!req.body.email) {
      return res
        .status(400)
        .send({ message: "Fields are required.", success: false });
    }
    const userData = await User.findOne({ email: req.body.email });
    if (userData) {
      if (userData.isVerified) {
        await User.updateOne(
          { email: req.body.email },
          { $set: { token: token } }
        );

        sendadminForgetymail(userData.username, req.body.email, token);

        res
          .status(200)
          .send({ message: "We Send ResetLink in Your Email", success: true });
      } else {
        res.status(200).send({ message: "error", success: false });
      }
    } else {
      res.status(200).send({ message: "error", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "somthing went wrong ", success: false });
  }
};


const resetPassword = async (req, res) => {
  try {
    if (!req.body.password || !req.body.cpassword) {
      return res
        .status(400)
        .send({ message: "Fields are required.", success: false });
    }

    const token = req.params.token;
    const userData = await User.findOne({ token: token });
    if (userData) {
      const newpassword = req.body.password;
      const spassowrd = await securePassword(newpassword);

      await User.findOneAndUpdate(
        { email: userData.email },
        { $set: { password: spassowrd, token: "" } }
      );
      res.status(200).send({ message: "done", success: true });
    } else {
      res.status(200).send({ message: "error", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "somthing went wrong ", success: false });
  }
};










const admindetails = async (req, res) => {
  try {
    const id = req.adminId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "error getting info", success: false, error });
  }
};

const userlistLoad = async (req, res) => {
  try {
    const id = req.adminId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      const userData = await User.find({});
      res
        .status(200)
        .send({ message: "fetched", success: true, data: userData });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error", success: false, error });
  }
};

const blockuser = async (req, res) => {
  try {

    const id = req.adminId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      const email = req.body.email;

      const userdata = await User.findOne({ email: email });

      if (userdata) {
        await User.findOneAndUpdate(
          { email: email },
          { $set: { isBlocked: true } }
        );
        res
          .status(200)
          .send({ message: "successfully blocked", success: true });
      } else {
        res.status(200).send({ message: "User Not Blocked", success: false });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const unblockuser = async (req, res) => {
  try {
    const id = req.adminId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      const email = req.body.email;

      const userdata = await User.find({ email: email });
      if (userdata) {
        await User.findOneAndUpdate(
          { email: email },
          { $set: { isBlocked: false } }
        );
        res
          .status(200)
          .send({ message: "successfully Unblocked", success: true });
      } else {
        res.status(200).send({ message: "User Not Found", success: false });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const addDriver = async (req, res) => {
  try {
    const id = req.adminId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {

      await sharp("./public/multer/" + req.files[0].filename)
        .resize(500, 500)
        .toFile("./public/cloudinary/" + req.files[0].filename);

      const data = await cloudinary.uploader.upload(
        "./public/cloudinary/" + req.files[0].filename
      );

      const cdurl = [data.secure_url];

      const saveData = new Hub({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        city: req.body.city,
        address: req.body.address,
        mobile: req.body.mobile,
        pin: req.body.pin,
        licence: req.body.licence,
        website: req.body.website,
        bio: req.body.bio,
        profileimage: cdurl,
      });

      const driverdata = await saveData.save();

      const name = req.body.fname + " " + req.body.lname;
      const email = req.body.email;
      const employeeId = driverdata.employeeId;
      if (driverdata) {
        sendmailtoDriver(name, email, employeeId);

        res.status(200).send({ message: "successfully saved", success: true });
      } else {
        res.status(200).send({ message: "Error", success: fals });
      }
    }
  } catch (error) {
    console.log("saveerror", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};

const getcitydetails = async (req, res) => {
  try {
    const id = req.adminId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      const citydata = await service.find();

      res
        .status(200)
        .send({ message: "fetched", success: true, data: citydata });
    }
  } catch (error) {
    res.status(200).send({ message: "error", success: false });
  }
};
const driverlistLoad = async (req, res) => {
  try {
    const id = req.adminId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      const driverdata = await Hub.find({});
      res
        .status(200)
        .send({ message: "fetched", success: true, data: driverdata });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error", success: false, error });
  }
};

const driverProfile = async (req, res) => {
  try {
    const id = req.params.id;

    const driver = await Hub.findById({ _id: id });

    if (driver) {
      res
        .status(200)
        .send({ message: "fetched ", success: true, data: driver });
    } else {
      res
        .status(200)
        .send({ message: " error while fetching", success: false });
    }
  } catch (error) {
    res.status(200).send({ message: "something went wrong", success: false });
  }
};

const driverstatusUpdate = async (req, res) => {
  try {
    const authid = req.adminId;
    const admin = await User.findOne({ _id: authid });
    if (!admin) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      const { id } = req.params;
      const { status } = req.body;

      const updatedriver = await hub.findByIdAndUpdate(
        { _id: id },
        { $set: { activestatus: status } }
      );
      if (updatedriver) {
        res.status(200).send({ message: "status updated", success: true });
      } else {
        res.status(200).send({ message: "failed to update", success: false });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(200).send({ message: "something went wrong", success: false });
  }
};

const getLocationData = async (req, res) => {
  try {
    const authid = req.adminId;
    const admin = await User.findOne({ _id: authid });
    if (!admin) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      const locationdata = await service.find({});

      res
        .status(200)
        .send({ message: "fetched", success: true, data: locationdata });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong", success: false });
  }
};
const addserviceCity = async (req, res) => {
  try {
    const authid = req.adminId;
    const admin = await User.findOne({ _id: authid });
    if (!admin) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      if (!req.body.city) {
        res
          .status(200)
          .send({ message: "This field is required", success: false });
      }
      const city = req.body.city;
      const alredy = await service.findOne({
        city: { $regex: city, $options: "i" },
      });

      if (!alredy) {
        const insertdata = new service({
          city: req.body.city,
        });

        const citydata = insertdata.save();
        if (citydata) {
          res.status(200).send({ message: "updated", success: true });
        } else {
          res.status(200).send({ message: "update failed", success: false });
        }
      } else {
        res.status(200).send({ message: "data already exist", success: false });
      }
    }
  } catch (error) {
    res.status(500).send({ message: "something went wrong", success: false });

    console.log(error);
  }
};

const addservicePlace = async (req, res) => {
  try {
    const authid = req.adminId;
    const admin = await User.findOne({ _id: authid });
    if (!admin) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      const { city, place } = req.body;
      if (!place) {
        return res
          .status(400)
          .send({ message: "Place field is required", success: false });
      }

      const citydata = await service.findOne({ city: city });

      if (citydata) {
        const placeExist = await service.findOne({
          city: city,
          place: { $elemMatch: { $regex: new RegExp(place, "i") } },
        });

        if (!placeExist) {
          await service.findOneAndUpdate(
            { city: city },
            { $addToSet: { place: place } }
          );
          return res
            .status(200)
            .send({ message: "Place added successfully", success: true });
        } else {
          return res
            .status(200)
            .send({ message: "Place existed", success: false });
        }
      } else {
        return res
          .status(404)
          .send({ message: "City not found", success: false });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const deletecity = async (req, res) => {
  try {
    const authid = req.adminId;
    const admin = await User.findOne({ _id: authid });
    if (!admin) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      const { city } = req.body;

      const deletedata = await service.deleteOne({ city: city });

      res.status(200).send({ message: "deleted", success: true });
    }
  } catch (error) {
    res.status(500).send({ message: "somthing went wrong", success: false });
  }
};

const deleteplace = async (req, res) => {
  try {
    const authid = req.adminId;
    const admin = await User.findOne({ _id: authid });
    if (!admin) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      const { position, city } = req.body;

      const findcity = await service.findOne({ city: city });

      if (!findcity) {
        return res
          .status(404)
          .send({ message: "City not found", success: false });
      }

      findcity.place.splice(position, 1);
      const updatedCity = await findcity.save();

      if (!updatedCity) {
        return res
          .status(500)
          .send({ message: "Failed to update city", success: false });
      }

      res.status(200).send({ message: "Place deleted", success: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const getshipmentdata = async (req, res) => {
  try {
    const shipmentdata = await shipmentModel.find({}).populate("shipment");

    if (shipmentdata) {
      res
        .status(200)
        .send({ message: "fetched", success: true, data: shipmentdata });
    } else {
      res.status(200).send({ message: "error", success: false });
    }
  } catch (error) {
    res.status(500).send({ message: "something went wrong", success: false });
  }
};

const getAllData = async (req, res) => {
  try {
    const id = req.adminId;
    const admin = await User.findById({ _id: id });

    if (admin) {
      const userCount = await User.countDocuments();

      const hubDataCount = await Hub.countDocuments();
      const hubData = await Hub.find();

      const shipmentCountByMonth = await shipmentupdates.aggregate([
        {
          $match: {
            status: "Shipment Delivered",
          },
        },
        {
          $group: {
            _id: {
              month: { $month: "$deliverydate" },
            },
            count: { $sum: 1 },
          },
        },
      ]);

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const shipmentCountByMonthWithNames = shipmentCountByMonth.map(
        (item) => ({
          month: monthNames[item._id.month - 1],
          count: item.count,
        })
      );

      const deliveredShipmentcount = await shipmentupdates.countDocuments({
        status: "Shipment Delivered",
      });

      const deliveredShipmentCountpie = await shipmentupdates.aggregate([
        {
          $match: {
            status: "Shipment Delivered",
            deliveredBy: { $ne: null },
          },
        },
        {
          $group: {
            _id: "$deliveredBy",
            count: { $sum: 1 },
          },
        },
        {
          $match: {
            _id: { $ne: null },
          },
        },
      ]);

      const deliveredShipment = await shipmentModel.find({
        "shipment.shipmentStatus": "Delivered",
      });
      res.status(200).send({
        message: "Data fetched successfully",
        success: true,
        user: userCount,
        hubCount: hubDataCount,
        hub: hubData,
        shipment: deliveredShipment,
        shipmentcount: deliveredShipmentcount,
        shipmentCountByMonth: shipmentCountByMonthWithNames,
        deliveredShipmentCountpie: deliveredShipmentCountpie,
      });
    } else {
      res.status(200).send({
        message: "Admin not found",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
    });
  }
};

const updateprofileimage = async (req, res) => {
  try {
    const id = req.adminId;
    const admin = await User.findById({ _id: id });

    if (admin) {
      await sharp("./public/multer/" + req.file.filename)
        .resize(500, 500)
        .toFile("./public/cloudinary/" + req.file.filename);

      const data = await cloudinary.uploader.upload(
        "./public/cloudinary/" + req.file.filename
      );

      const cdurl = data.secure_url;

      await User.findOneAndUpdate(
        { email: admin.email },
        { $set: { profileimage: cdurl } }
      );

      res
        .status(200)
        .send({ message: "image uploaded", success: true, image: cdurl });
    } else {
      res.status(200).send({
        message: "Admin not found",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
    });
  }
};

const adminReportByHub = async (req, res) => {
  try {
    const id = req.adminId;
    const admin = await User.findById({ _id: id });

    if (admin) {
      const { city } = req.body;

      if (city === "All") {
        const shipments = await shipmentModel.find();

        const totalAdvanceAmount = shipments.reduce((total, shipment) => {
          return total + (shipment.shipment[0].advanceamount || 0);
        }, 0);

        const totalDeliveredShipments = await shipmentModel.countDocuments({
          "shipment.shipmentStatus": "Delivered",
        });

        const totalUndeliveredShipments = await shipmentModel.countDocuments({
          "shipment.shipmentStatus": { $ne: "Delivered" },
        });

        res.status(200).send({
          message: "Data fetched successfully",
          success: true,
          totalAdvanceAmount: totalAdvanceAmount,
          totalDeliveredShipment: totalDeliveredShipments,
          totalUndeliveredShipments: totalUndeliveredShipments,
        });
      } else {
        const shipments = await shipmentModel.find({
          fromhub: city,
        });

        const totalAdvanceAmount = shipments.reduce((total, shipment) => {
          return total + (shipment.shipment[0].advanceamount || 0);
        }, 0);

        const totalDeliveredShipments = await shipmentModel.countDocuments({
          fromHub: city,
          "shipment.shipmentStatus": "Delivered",
        });


        const totalUndeliveredShipments = await shipmentModel.countDocuments({
          fromHub: city,
          "shipment.shipmentStatus": { $ne: "Delivered" },
        });

        res.status(200).send({
          message: "Data fetched successfully",
          success: true,
          totalAdvanceAmount: totalAdvanceAmount,
          totalDeliveredShipment: totalDeliveredShipments,
          totalUndeliveredShipments: totalUndeliveredShipments,
        });
      }
    } else {
      res.status(200).send({
        message: "Admin not found",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
    });
  }
};

const updateadminDetails = async (req, res) => {
  try {
    const id = req.adminId;
    const admin = await User.findById({ _id: id });

    if (admin) {
      const { input, field } = req.body;

      const updatedUser = await User.updateOne(
        { _id: id },
        { $set: { [field]: input } },
        { new: true }
      );

      if (updatedUser) {
        res.status(200).send({
          message: " details updated successfully",
          success: true,
        });
      } else {
        res
          .status(200)
          .send({ message: "User details were not updated", success: false });
      }
    } else {
      res.status(200).send({
        message: "Admin not found",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
    });
  }
};

module.exports = {
  adminLogin,
  forgetMail,
  resetPassword,
  admindetails,
  userlistLoad,
  blockuser,
  unblockuser,
  addDriver,
  getcitydetails,
  driverlistLoad,
  driverProfile,
  driverstatusUpdate,
  getLocationData,
  addserviceCity,
  addservicePlace,
  deletecity,
  deleteplace,
  getshipmentdata,
  getAllData,
  updateprofileimage,
  adminReportByHub,
  updateadminDetails,
};
