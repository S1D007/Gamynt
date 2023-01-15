const mongoose = require("mongoose")

const otpSchema = require("../schemas/otpVerification")

const OTP = mongoose.model("OTP",otpSchema)

module.exports = OTP
