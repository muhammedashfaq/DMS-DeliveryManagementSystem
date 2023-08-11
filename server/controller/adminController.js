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

          console.log(token);
  
          
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
  









module.exports={
    adminLogin,
    admindetails
}