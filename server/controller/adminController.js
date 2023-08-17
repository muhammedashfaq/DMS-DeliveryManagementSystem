const express = require("express");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Driver = require("../models/driverModels");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const { sendmailtoDriver } = require("../config/nodemailer");

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
        const token = jwt.sign({ id: user._id, name:user.username }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res
          .status(200)
          .send({
            message: "successfully logged",
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

const admindetails = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
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

const userlistLoad = async (req, res) => {
  try {
    const userData = await User.find({});
    res.status(200).send({ message: "fetched", success: true, data: userData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error", success: false, error });
  }
};

const blockuser = async (req, res) => {
  try {
    const email = req.body.email;
    console.log(req.body);

    const userdata = await User.findOne({ email: email });

    if (userdata) {
      await User.findOneAndUpdate(
        { email: email },
        { $set: { isBlocked: true } }
      );
      res.status(200).send({ message: "successfully blocked", success: true });
    } else {
      res.status(200).send({ message: "User Not Blocked", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const unblockuser = async (req, res) => {
  try {
    const email = req.body.email;
    console.log(req.body);

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
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong", success: false });
  }
};

const addDriver = async (req, res) => {
  try {




    // console.log(req.file[0].filename)

    // if (!req.body.fname || !req.body.lname || !req.body.email || !req.body.gender ||
    //     !req.body.address || !req.body.age || !req.body.mobile || !req.body.pin || !req.body.licence ||
    //     !req.files.fileImage || !req.files.profileimage) {
    //   return res.status(400).send({
    //     message: "All required fields and images are necessary.",
    //     success: false
    //   });
    // }

    const image = req.files[0].filename;
    const multerImages ='../config/multerImages/'
    const cloudinaryimages ='../config/coudinaryimages/'

    // await sharp(`${multerImages}${image}`)
    //   .resize(500, 500)
    //   .toFile(`${cloudinaryimages}${image}`);

    // const data = await cloudinary.uploader.upload(
    //   `${multerImages}${image}`
    // );

    // const cdurl = [data.secure_url];

    const saveData = new Driver({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      gender: req.body.gender,
      address: req.body.address,
      age: req.body.age,
      mobile: req.body.mobile,
      pin: req.body.pin,
      licence: req.body.licence,
      website: req.body.website,
      bio: req.body.bio,
      profileimage: image,
    });

    const driverdata = await saveData.save();

    const name =req.body.fname+" "+req.body.lname
    const email=req.body.email
    const employeeId=driverdata.employeeId
    if (driverdata) {

      sendmailtoDriver(name,email,employeeId)




      res.status(200).send({ message: "successfully saved", success: true });
    } else {
      res.status(200).send({ message: "Error", success: fals });
    }
  } catch (error) {
    console.log("saveerror", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};


const driverlistLoad = async(req,res)=>{
  try {
    
    const driverdata = await Driver.find({});
    res.status(200).send({ message: "fetched", success: true, data: driverdata });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error", success: false, error });
  }
}
module.exports = {
  adminLogin,
  admindetails,
  userlistLoad,
  blockuser,
  unblockuser,
  addDriver,
  driverlistLoad,
};



