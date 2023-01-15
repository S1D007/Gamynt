const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    bio: String,
    joinedClubs: [
        {
            club:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Club"
            }
        }
    ],
    avatar: {
        type: String
    },
    banner: {
        type: String
    },
    joinedTournaments: [
        {
            tournament: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "TournamentRegistration"
            }
        }
    ],
    uid: {
        type: String
    },
    tags: [
        {
            name: String,
            tag: String
        }
    ],
    gamesIPlay: {
        type: []
    },
    team: {
        type: []
    },
    balance: {
        type: Number
    },
    followers: [
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    followCount: Number,
    followingCount: Number,
    following: [
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    post: [
        {
            typeOfPost: String,
            url: String
        }
    ],
    directMessage: [
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            messages: [
                {
                    date: String,
                    msg: String,
                    typeOfMessage: String
                }
            ]
        }
    ],
    notifications: [
        {
            date: String,
            message: String,
            callToActionLink: String
        }
    ],
    coins: Number,
    diamonds: Number,
    name: String,
    isVerified: Boolean,
    subscription: [
        {
            name: String,
            duration: String
        }
    ],
    phone: "",
    ip_address: "",
    state: "",
    likedPost: [
        {
            username: String,
            email: String,
        }
    ]
})

module.exports = userSchema
