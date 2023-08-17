const mongoose = require('mongoose');
const crypto =require('crypto')
function generateUniqueId() {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);  
  return "HL" + randomNumber

}
const driverSchema = new mongoose.Schema({
  employeeId: { type: String, default:  generateUniqueId },
    fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password:{
    type:String, 
    default:''

  },
  fileImage: {
    type:Array
  },

  profileimage: {
  type:Array
},
  address: {
    type: String, 
    default: ''
  },
  age: {
    type: Number, 
    default: 0
  },
  mobile: {
    type: String,
    default: ''
  },
  pin: {
    type: String,
    default: ''
  },
  licence: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Driver', driverSchema); 
