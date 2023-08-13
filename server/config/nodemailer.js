
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");



 const sendVerifymail = async (name, email, otp) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.email,
          pass: process.env.password,
        },
      });
      const mailOption = {
        from: process.env.email,
        to: email,
        subject: "For OTP verification",
        html:
          "<p>hi" +
          name +
          ',please  enter the' +
          otp +
          " for your verification " +
          email +
          "</p>",
      };
  
      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.log(error.message);
        } else {
          console.log("emai has been send to:", info.response);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
 const sendForgetymail = async (name, email, randomstring) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.email,
          pass: process.env.password,
        },
      });
      const mailOption = {
        from: process.env.email,
        to: email,
        subject: "Your Reset Password Link",
        html:
        "<p>hi " +
        name +
        ' ,please click here to<a href="http://localhost:3000/reset?randomstring=' +
        randomstring +
        '">Reset your password </a></p>',
      };
  
      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          console.log(error.message);
        } else {
          console.log("emai has been send to:", info.response);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const securePassword = async (password) => {
    try {
      // const salt = await bcrypt.genSalt(10);
  
      const passwordHash = await bcrypt.hash(password, 10);
      return passwordHash;
    } catch (error) {
      console.log(error.message);
    }
  };

module.exports={
  sendForgetymail,
  sendVerifymail,
  securePassword
}