const mongoose = require("mongoose");
function generateUniqueId() {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);
  return "HL" + randomNumber;
}
const hubSchema = new mongoose.Schema(
  {
    employeeId: { type: String, default: generateUniqueId },
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: "",
    },
    activestatus: {
      type: String,
      default: "Active",
    },
    fileImage: {
      type: Array,
    },

    profileimage: {
      type: Array,
    },
    address: {
      type: String,
      default: "",
    },

    mobile: {
      type: String,
      default: "",
    },
    pin: {
      type: String,
      default: "",
    },
    licence: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hub", hubSchema);
