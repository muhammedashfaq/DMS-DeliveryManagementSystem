
const nodemailer = require("nodemailer");


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
        //html:"<p> Hii  " +name+ "  please enter  " +otp+ "  as your OTP for verification </p>"
        // html:'<p>hi '+name+' ,please click here to<a href="http://localhost:3000/otp " '+email+' >varify</a> for verify and enter the '+otp+ ' </p>'
        html:
          "<p>hi" +
          name +
          ',please click here to<a href="https://tzwatches.shop/otp">varify</a> and enter the' +
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
  

  module.exports=sendVerifymail