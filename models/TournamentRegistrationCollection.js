const mongoose = require("mongoose")

const TournamentRegistrationSchema = require("../schemas/tournamentRegistration")

const TournamentRegistration = mongoose.model("TournamentRegistration",TournamentRegistrationSchema)

module.exports = TournamentRegistration
