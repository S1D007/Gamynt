const mongoose = require("mongoose")

const ClubServerSchema = require("../schemas/clubServerSchema")

const ClubServer = mongoose.model("Club",ClubServerSchema)

module.exports = ClubServer
