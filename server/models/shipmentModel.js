const mongoose = require("mongoose");

const randomstring = require("randomstring");

function generaterandomString() {
  const randomString = randomstring.generate(8);
  return "HL" + randomString;
}

const shipmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    fromhub: {
      type: String,
      required: true,
      trim: true,
    },
    tohub: {
      type: String,
      required: true,
      trim: true,
    },

    shipment: [
      {
        advanceamount: {
          type: Number,
          default: 100,
        },
        advanceamountStatus: {
          type: Boolean,
          default: false,
        },
        paymentid: {
          type: String,
        },
        trackid: {
          type: String,
          default: generaterandomString,
        },

        fromcity: {
          type: String,
          required: true,
          trim: true,
        },

        fromplace: {
          type: String,
          required: true,
          trim: true,
        },
        fromname: {
          type: String,
          required: true,
          trim: true,
        },
        frommobile: {
          type: Number,
          required: true,
          trim: true,
        },

        fromaddress: {
          type: String,
          required: true,
          trim: true,
        },
        frompin: {
          type: String,
          required: true,
          trim: true,
        },
        fromdescription: {
          type: String,
          trim: true,
        },
        toname: {
          type: String,
          required: true,
          trim: true,
        },
        tomobile: {
          type: String,
          required: true,
          trim: true,
        },
        toaddress: {
          type: String,
          required: true,
          trim: true,
        },

        topin: {
          type: String,
          required: true,
          trim: true,
        },

        tocity: {
          type: String,
          required: true,
          trim: true,
        },
        toplace: {
          type: String,
          required: true,
          trim: true,
        },
        shipmentStatus: {
          type: String,
          trim: true,
          default: "Pending",
        },
        bookingdate: {
          type: Date,
          trim: true,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("shipment", shipmentSchema);
