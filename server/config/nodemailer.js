
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
          user: process.env.Email,
          pass: process.env.Password,
        },
      });
      const mailOption = {
        from: process.env.Email,
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
          user: process.env.Email,
          pass: process.env.Password,
        },
      });
      const mailOption = {
        from: process.env.Email,
        to: email,
        subject: "Your Reset Password Link",
        html:
        "<p>hi " +
        name +
        ' ,please click here to<a href="https://hrlogistics.netlify.app/reset?randomstring=' +
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
  

  const sendadminForgetymail = async (name, email, randomstring) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.Email,
          pass: process.env.Password,
        },
      });
      const mailOption = {
        from: process.env.Email,
        to: email,
        subject: "Your Reset Password Link",
        html:
        "<p>hi " +
        name +
        ' ,please click here to<a href="https://hrlogistics.netlify.app/adminresetpassword?randomstring=' +
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
  


 const sendmailtoDriver = async (name, email, empid) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.Email,
          pass: process.env.Password,
        },
      });
      const mailOption = {
        from: process.env.Email,
        to: email,
        subject: "Your Reset Password Link",
        html:
        "<p>hi " +
        name +
        '    Welcome to <strong>Horizonlogistics</strong>! Your employee ID is <strong>'+
        empid +'</strong>.You can log in using this link:">Reset your password </a></p>',

       



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
  sendadminForgetymail,
  securePassword,
  sendmailtoDriver
}