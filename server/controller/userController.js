const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const randomString = require("randomstring");
const nodemailer = require("nodemailer");
const {
  sendForgetymail,
  sendVerifymail,
  securePassword,
} = require("../config/nodemailer");


var savedOtp;
var useremail;

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
      console.log("Incoming request body:");

      sendVerifymail(req.body.username, req.body.email, otpGenarated);
    }
    res.status(200).send({ message: "user created ", success: true });
  } catch (error) {
    res.status(500).send({ message: "error creating user", success: false });
  }
};

const loginpage = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .send({ message: "Email and password are required.", success: false });
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(200).send({ message: "user not exist", success: false });
    } else if (user.isVerified) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        res.status(200).send({ message: "incorrect password", success: false });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res
          .status(200)
          .send({ message: "successfully logged", success: true, data: token,name:user.username });
      }
    } else {
      res.status(200).send({ message: "user not verified", success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong", success: false });
  }
};

const userdetails = async (req, res) => {
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

        res.status(200).send({ message: "We Send ResetLink in Your Email", success: true });
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

module.exports = {
  registerpage,
  loginpage,
  userdetails,
  otpVerification,
  resetPassword,
  forgetMail,
};
