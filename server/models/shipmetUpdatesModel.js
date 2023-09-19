const mongoose = require("mongoose");

const updatesSchema = new mongoose.Schema(
  {
    TrackID: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    shipment: {
      type: mongoose.Types.ObjectId,
      ref: "shipment",
      required: true,
    },
   
      
    deliveredBy:{
      type: String,
      trim: true,
      default: "",


    },

    status: {
      type: String,
      trim: true,
      default: "Aproved",
    },
    pickupdate: {
      type: Date,
    },
    deliverydate: {
      type: Date,
    },
    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("shipmentupdate", updatesSchema);
