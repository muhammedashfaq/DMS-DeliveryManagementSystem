const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  city: {
    type: String,
    trim: true,
    required: true,
  },

  place: {
    type: Array,
  },
});

module.exports = mongoose.model("service", serviceSchema);
