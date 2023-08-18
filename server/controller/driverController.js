const Driver = require("../models/driverModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { securePassword } = require("../config/nodemailer");

const logindriver = async (req, res) => {
  try {
    if (!req.body.employeeid || !req.body.password) {
      res.status(200).send({ message: "field required", success: false });
    }
    const idexist = await Driver.findOne({ employeeId: req.body.employeeid });
    const drivername = idexist.fname + " " + idexist.lname;
    if (idexist) {
      if(idexist.activestatus==="Active"){

        if (idexist.password === "") {
          const password = req.body.password;
          const passwordHash = await securePassword(password);
          await Driver.updateOne(
            { employeeId: req.body.employeeid },
            { $set: { password: passwordHash } }
        );

        const token = jwt.sign(
          { id: idexist._id, name: drivername },
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
              { id: idexist._id, name: drivername },
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
        }else{
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


const driverdetails =async(req,res)=>{
  try {
      console.log('reached');

    const id = req.driverId
    const user = await Driver.findOne({ _id: id });
    console.log(id,'hhhhh')
    const drivername = user.fname + " " + user.lname;

    if (!user) {
      return res
        .status(200)
        .send({ message: "user does no exist", success: false });
    } else {
      res.status(200).send({message:"done",success:true, name:drivername})
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "error getting info", success: false, error });
  }
}
module.exports = {
  logindriver,
  driverdetails
};
