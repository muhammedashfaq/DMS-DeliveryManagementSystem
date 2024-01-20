const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const userAddress = require("../models/userAddress.js");
const jwt = require("jsonwebtoken");
const randomString = require("randomstring");
const service = require("../models/servicesModel");
const Razorpay = require("razorpay");
const sharp = require("sharp");
const shipmentModel = require("../models/shipmentModel");
const shipmentupdates = require("../models/shipmetUpdatesModel");
const ChatModel = require("../models/ChatModel");
const cloudinary = require("cloudinary").v2;
const {
  sendForgetymail,
  sendVerifymail,
  securePassword,
} = require("../config/nodemailer");
const hubModels = require("../models/hubModels");

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

let savedOtp;
let useremail;

const registerpage = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.username ||
      !req.body.cpassword ||
      req.body.cpassword !== req.body.password
    ) {
      return res
        .status(400)
        .send({ message: "Fields are required.", success: false });
    }
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res
        .status(200)
        .send({ message: "user already exist", success: false });
    }

    const password = req.body.password;
    const passwordHash = await securePassword(password);
    req.body.password = passwordHash;

    const newUser = new User(req.body);
    const userData = await newUser.save();
    if (userData) {
      const otpGenarated = Math.floor(1000 + Math.random() * 9999);
      savedOtp = otpGenarated;
      useremail = req.body.email;
      sendVerifymail(req.body.username, req.body.email, otpGenarated);
    }
    res.status(200).send({ message: "user created ", success: true });
  } catch (error) {
    res.status(500).send({ message: "error creating user", success: false });
  }
};

const loginpage = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .send({ message: "Email and password are required.", success: false });
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(200).send({ message: "user not exist", success: false });
    }
    if (user.isVerified) {
      if (!user.isBlocked) {
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
          res
            .status(200)
            .send({ message: "incorrect password", success: false });
        } else {
          const token = jwt.sign(
            { id: user._id, name: user.username, role: "USER" },
            process.env.JWT_SECRET_USER,
            {
              expiresIn: "1d",
            }
          );

         
          res.status(200).send({
            message: "successfully logged",
            success: true,
            data: token,
            name: user.username,
          });
        }
      } else {
        res.status(200).send({ message: "user is Blocked", success: false });
      }
    } else {
      res.status(200).send({ message: "user not verified", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong", success: false });
  }
};



const googlelogin = async (req, res) => {
  try {
    const { email, name, passwordbody } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      if (user.isVerified) {
        if (!user.isBlocked) {
          const token = jwt.sign(
            { id: user._id, name: user.username, role: "USER" },
            process.env.JWT_SECRET_USER,
            {
              expiresIn: "1d",
            }
          );

          res.status(200).send({
            message: "successfully logged",
            success: true,
            data: token,
            name: user.username,
          });
        } else {
          res.status(200).send({ message: "user is Blocked", success: false });
        }
      } else {
        res.status(200).send({ message: "user not verified", success: false });
      }
    } else {

      const password = "hrlogistics##4321";
      const passwordHash = await securePassword(password);

      const newuser = new User({
        username: name,
        email: email,
        password: passwordHash,
        isVerified: true,
      });
      const newuserData = await newuser.save();

      if (newuserData) {
        const token = jwt.sign(
          { id: newuserData._id, name: newuserData.username,role: "USER" },
          process.env.JWT_SECRET_USER,
          {
            expiresIn: "1d",
          }
        );

        res.status(200).send({
          message: "successfully logged",
          success: true,
          data: token,
          name: newuserData.username,
        });
      } else {
        res.status(200).send({ message: "user login failed", success: false });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong", success: false });
  }
};

const userdetails = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: { name: user.username, email: user.email },
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "error getting info", success: false, error });
  }
};

const otpVerification = async (req, res) => {
  try {
    if (req.body.otp == savedOtp) {
      await User.findOneAndUpdate(
        { email: useremail },
        { $set: { isVerified: 1 } }
      );

      res.status(200).send({ message: "otp validation done ", success: true });
    } else {
      res
        .status(200)
        .send({ message: "otp validation not doen ", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "somthing went wrong ", success: false });
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

        sendForgetymail(userData.username, req.body.email, token);

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

const getprofile = async (req, res) => {
  try {
    const id = req.userId;

    const user = await User.findOne({ _id: id });

    // const address = await userAddress.findOne({ user: user._id });
    // const addressdetails = address.address;
    if (!user) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      const shipmentdata = await shipmentModel
        .find({ user: user._id })
        .populate("shipment");
      res.status(200).send({
        success: true,
        data: user,
        shipmentdata: shipmentdata,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "error getting info", success: false, error });
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.userId;
    const userdata = await User.findOne({ _id: id });

    if (userdata) {
      await sharp("./public/multer/" + req.file.filename)
        .resize(500, 500)
        .toFile("./public/cloudinary/" + req.file.filename);

      const data = await cloudinary.uploader.upload(
        "./public/cloudinary/" + req.file.filename
      );

      const cdurl = data.secure_url;

      await User.findOneAndUpdate(
        { email: userdata.email },
        { $set: { profileimage: cdurl } }
      );

      res
        .status(200)
        .send({ message: "image uploaded", success: true, image: cdurl });
    } else {
      res.status(200).send({ message: "user does no exist", success: false });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "error getting info", success: false, error });
  }
};

const addAddress = async (req, res) => {
  try {
    const id = req.userId;

    const user = await User.findById({ _id: id });

    if (user) {
      const checkuser = await userAddress.findOne({ user: user._id });

      if (checkuser) {
        const update = await userAddress.updateOne(
          { user: user._id },
          {
            $push: {
              address: {
                name: req.body.name,
                mobile: req.body.mobile,
                address: req.body.address,
                pin: req.body.pin,
              },
            },
          }
        );

        res.status(200).send({ message: "Address Added", success: true });
      } else {
        const data = new userAddress({
          user: user._id,
          address: [
            {
              name: req.body.name,
              mobile: req.body.mobile,
              address: req.body.address,
              pin: req.body.pin,
            },
          ],
        });

        const addressData = await data.save();

        res.status(200).send({ message: "Address Added", success: true });
      }
    } else {
      res.status(200).send({ message: "User not exist", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "somthing wrong", success: false });
  }
};

const getLocationData = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findOne({ _id: id });
    if (!user) {
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

const bookshipment = async (req, res) => {
  try {
    const {
      fromcity,
      fromplace,
      tocity,
      toplace,
      fromname,
      frommobile,
      frompin,
      fromaddress,
      fromdescription,
      toname,
      tomobile,
      toaddress,
      topin,
    } = req.body;
    const bodyid = req.userId;

    const user = await User.findById({ _id: bodyid });

    if (user) {
      const newshipmetdata = new shipmentModel({
        user:user._id,
        username: user.username,
        fromhub: fromcity,
        tohub: tocity,
        shipment: [
          {
            fromcity: fromcity,
            fromplace: fromplace,
            fromname: fromname,
            frommobile: frommobile,
            fromaddress: fromaddress,
            frompin: frompin,
            fromdescription: fromdescription,
            toname: toname,
            tomobile: tomobile,
            toaddress: toaddress,
            topin: topin,
            tocity: tocity,
            toplace: toplace,
          },
        ],
      });
      const newsaveddata = await newshipmetdata.save();

      const shipmentData = newsaveddata.shipment[0];
      const shipmentid = newsaveddata._id;

      res.status(200).send({
        message: "Shipment Booked",
        success: true,
        data: shipmentData,
        id: shipmentid,
      });
    } else {
      res.status(200).send({ message: "user does no exist", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong", success: false });
  }
};

const advancepaymentUpdate = async (req, res) => {
  const idbody = req.body.id;
  const paymentid = req.body.payment.razorpay_payment_id;

  try {
    const id = req.userId;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      const updateOrder = await shipmentModel.findOneAndUpdate(
        { _id: idbody, "shipment._id": req.body.order._id },
        {
          $set: {
            "shipment.$.advanceamountStatus": true,
            "shipment.$.paymentid": paymentid,
          },
        },
        { new: true }
      );

      if (updateOrder) {
        res.status(200).send({ message: "Payment successful", success: true });
      } else {
        res.status(200).send({
          message: "Something went wrong, please try again later",
          success: false,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

const trackshipment = async (req, res) => {
  try {
    const { id } = req.body;

    const shipmentdetails = await shipmentModel.findOne({
      shipment: { $elemMatch: { trackid: id } },
    });
    if (shipmentdetails) {
      const shipmentupdatedetails = await shipmentupdates.findOne({
        TrackID: id,
      });

      res.status(200).send({
        message: "fetched",
        success: true,
        shipment: shipmentdetails,
        updates: shipmentupdatedetails,
      });
    } else {
      res.status(200).send({ message: "Invalid TrackID", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(200).send({ message: "something went wrong ", success: false });
  }
};

const chatHistory = async (room, message, author) => {
  const roomexist = await ChatModel.findOne({ chatRoom: room });

  if (roomexist) {
    const id = roomexist._id;
    const chatUpdate = await ChatModel.findByIdAndUpdate(
      id,
      {
        $push: {
          chathistory: {
            author: author,
            message: message,
            time: new Date(),
          },
        },
      },
      { new: true }
    );
  } else {
    const savechat = new ChatModel({
      chatRoom: room,
      chathistory: [
        {
          author: author,
          message: message,
          time: new Date(),
        },
      ],
    });
    await savechat.save();
  }
};

const getchathistory = async (req, res) => {
  try {
    const { trackid, hubid } = req.body;

    const gethistory = await ChatModel.findOne({ chatRoom: trackid });
    const chat = gethistory?.gethistory;
    const senderchats = chat?.filter((item) => item.auther !== hubid);

    let senderid;
    if (senderchats) {
      senderid = senderchats[0]?.auther;
    }
    const profile = await hubModels.findOne({ _id: senderid });

    const hubname = profile.city;
    if (gethistory) {
      res.status(200).send({ chat, hubname, success: true });
    }
  } catch (error) {
    res.status(500).send({ message: "wrong", success: false });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const id = req.userId;

    const user = await User.findOne({ _id: id });
    if (user) {
      const { input, field } = req.body;

      const updatedUser = await User.updateOne(
        { _id: id },
        { $set: { [field]: input } },
        { new: true }
      );

      if (updatedUser) {
        res.status(200).send({
          message: "User details updated successfully",
          success: true,
        });
      } else {
        res
          .status(200)
          .send({ message: "User details were not updated", success: false });
      }
    } else {
      res.status(200).send({ message: "user Not Found", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};
module.exports = {
  registerpage,
  loginpage,
  googlelogin,
  userdetails,
  otpVerification,
  resetPassword,
  forgetMail,
  getprofile,
  updateProfile,
  addAddress,
  getLocationData,
  bookshipment,
  advancepaymentUpdate,
  chatHistory,
  trackshipment,
  getchathistory,
  updateUserDetails,
};
