const mongoos = require("mongoose");

const userSchema = new mongoos.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: "",
    },
    profileimage: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      trim: true,
      default:""
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoos.model("user", userSchema);
