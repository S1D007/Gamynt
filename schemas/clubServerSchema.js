const mongoose = require('mongoose')

const ClubServerSchema = mongoose.Schema({
    clubName: {
        type: String
    },
    clubOwner: {
        type: String
    },
    isPaid: {
        type: Boolean
    },
    isVerified: {
        type: Boolean
    },
    clubLogo: {
        type: String
    },
    clubBanner: {
        type: String
    },
    channelList: [
        {
            name: String,
            messages: [
                {
                    user: {
                        type:mongoose.Schema.Types.ObjectId,
                        ref:"User"
                    },
                    date: String,
                    message: String,
                }
            ]
        }
    ],
    membersList: [
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    description: {
        type: String
    },
    tournaments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"TournamentRegistration"
        }
    ]
})

module.exports = ClubServerSchema