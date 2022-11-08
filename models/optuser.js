const mongoose = require("mongoose");
const conn = require("../config/dbconnection");

const otpSchema = new mongoose.Schema({
  phone: {
    type: Number,
    require: true,
  },
  code: Number,
  time: Number,
})


module.exports = conn.model("otp", otpSchema, "otp");

