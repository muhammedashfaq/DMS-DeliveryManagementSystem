const mongoose =require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

module.exports={

   mongoDB:()=>{

       mongoose.connect(process.env.mongo_url,{
           
       }).then(()=>{
           console.log("database connected succesfully");
       }).catch((err)=>{
           console.log(err);
       })
   }

}
