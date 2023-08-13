const express = require("express");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res
          .status(200)
          .send({ message: "successfully logged", success: true, data: token });
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
        res
          .status(200)
          .send({ message: "successfully blocked", success: true });
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
        res.status(200).send({ message: "successfully Unblocked", success: true });
      } 
     else {
      res.status(200).send({ message: "User Not Found", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong", success: false });
  }
};
module.exports = {
  adminLogin,
  admindetails,
  userlistLoad,
  blockuser,
  unblockuser,
};
