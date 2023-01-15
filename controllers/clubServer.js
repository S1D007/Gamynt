const ClubServer = require("../models/ClubServer")
// const ClubServer = require('../models/ClubServer')
const { ObjectId } = require("mongoose");
const User = require("../models/User")
const { v4: uuidv4 } = require('uuid');
module.exports.createClub = async (req, res) => {
    const { clubName, clubLogo, clubBanner, description,userID,clubOwner } = req.query
    const doc = new ClubServer({
        clubName, clubOwner, clubLogo, description,
        clubBanner, membersList: [
            {
                user:userID
            }
        ], channelList: [{
            name: "general",
            messages:[]
            // messages: [{
            //     user: userID,
            //     date: "",
            //     message: `Welcome to ${clubName}`
            // }]
        }
        ],
        isPaid: false,
        isVerified: false
    })
    await doc.save()
    res.send({
        result:true
    })
}

// Get

module.exports.getAllClubs = async (req,res) => {
    const data = ClubServer.find({}).then((e)=>{
        res.json(e)
        // console.log(e)
    })
    // const randomClub = data.sort(() => Math.random() - 0.5);
}
module.exports.getClubByID = async(req,res)=>{
    const {_id} = req.query
    const data = await ClubServer.findOne({
        _id
    }).populate({
        path:"membersList.user",
        select:"username avatar"
    }).then((e)=>{
        res.send(e)
    })
}

module.exports.getChats = async(req,res)=>{
    const {_id,index} = req.query;
    ClubServer.findOne({ _id: _id }).populate({
        path:"channelList.messages.user",
        select:"username avatar isVerified"
    }).sort({ createdAt: -1 }).limit(10).exec((err, messages) => {
        if (err) {
          // handle error
        } else {
            const chats = messages.channelList[index].messages;
                res.send(chats)
        }
      });
}

module.exports.createChannel = async(req,res)=>{
    const {_id,name} = req.query
    const club = await ClubServer.findOne({
        _id
    })

    club.channelList.push({
        name,
        messages: []
    })
    await club.save()
    res.send(club)
    // console.log(club)
}
module.exports.getChannel = async (req,res) =>{
    const {_id} = req.query
    const club = await ClubServer.findOne({
        _id
    })
    const channels = club.channelList
    res.send(channels)
}
module.exports.addMember = async (req,res)=>{
    const {userID,_id} = req.query;
    const club = await ClubServer.findOne({
        _id
    })
    if (!club?.membersList?.some((member) => member?.user?.toString() === userID)){
        User.findByIdAndUpdate(userID, {$push: {joinedClubs: {club:_id}}}, {new: true}, function (err, user) {});
        ClubServer.findByIdAndUpdate(_id, {$push: {membersList: {user:userID}}}, {new: true}, function (err, club) {});
    }
}