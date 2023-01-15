const fast2sms = require('fast-two-sms')
const express = require("express")
const cdn = require("cloudinary").v2
const routes = express.Router()
cdn.config({
    cloud_name: "dd2rk71gb",
    api_key: "363211158946923",
    api_secret: "sqTD-thpTcu7OmrjUC7FvFvFmuI",
});
// const {createOrder,getOrder} = require("../controllers/payment")
const {createPost, getPosts, like}  = require("../controllers/post")
const {tournamentRegistration,tournamentAll,getTournament, joinTournament} = require("../controllers/tournamentRegistration")
const {getUser,getUserByUsername, getUsers,coins, editProfile,addFollowers} = require("../controllers/User")
const {createClub,getAllClubs,getClubByID,getChats,createChannel,getChannel,addMember,getMember} = require("../controllers/clubServer")
const {otp,verifyOTP} = require("../controllers/otp.js")
routes.post("/upload",(req,res)=>{
    const files = req.files.img
    cdn.uploader.upload(files.tempFilePath, async (err, result) => {
        res.send({
            result:result.url
        })
    })
})
routes.get("/create-club",createClub)
routes.get("/register-tournament",tournamentRegistration)
routes.get("/otp",otp)
routes.get("/otp-verify",verifyOTP)
routes.get("/add-followers",addFollowers)
routes.get("/all-tournament",tournamentAll)
routes.get("/get-tournament",getTournament)
routes.get("/join-tournament",joinTournament)
routes.get("/all-clubs",getAllClubs)
routes.get("/club",getClubByID)
routes.get("/get-user",getUser)
routes.get("/get-user-by-username",getUserByUsername)
routes.get("/get-channels",getChannel)
routes.get("/get-chats",getChats)
routes.get("/like",like)
routes.get("/create-channel",createChannel)
routes.get("/add-member",addMember)
routes.get("/users",getUsers)
routes.get("/coins",coins)
routes.get("/create-post",createPost)
routes.get("/get-posts",getPosts)
routes.get("/edit-profile",editProfile)
module.exports = routes
    
