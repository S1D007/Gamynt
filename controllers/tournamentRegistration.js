const TournamentRegistration = require("../models/TournamentRegistrationCollection")
const cdn = require("cloudinary").v2
const User = require("../models/User")
const { v4: uuidv4 } = require('uuid');
module.exports.tournamentRegistration = async (req, res) => {
    const { game, title, bannerImgUrl, mode, slot, EntryFees, description, PrizePool, tags, schedule } = req.query
    try {
        const doc = new TournamentRegistration({
            bannerImgUrl,
            title,
            game,
            mode,
            slot,
            EntryFees,
            description,
            PrizePool,
            tags: tags,
            id: uuidv4(),
            participiants: [],
            schedule,
            advance: [],
            creds:{
                id:"",
                pass:""
            },
            rules:"",
            winner:[]
        })
        await doc.save()
        // console.log(doc)
        res.send(doc)
    } catch (e) {
        res.send(e)
    }
}

// Get Requests

module.exports.tournamentAll = async (req, res) => {
    const data = await TournamentRegistration.find()
    const randomTournaments = data.sort(() => Math.random() - 0.5);
    res.send(randomTournaments)
}

module.exports.getTournament = async (req, res) => {
    const { id } = req.query;
    const data = await TournamentRegistration.findOne({ id }).populate("participiants.user")
    res.send(data)
}

module.exports.joinTournament = async (req,res) => {
    const {_id,idTournament} = req.query;
   try{
    const doc = await TournamentRegistration.findOne({_id:idTournament});
    const userDoc = await User.findOne({_id})
    doc.participiants.push({
        user:_id
    })
    // console.log(userDoc.joinedTournaments)
    userDoc.joinedTournaments.push({
        tournament:idTournament
    })
    await doc.save()
    await userDoc.save()
    res.send({
        done:true
    })
   }catch(e){
    console.log(e)
    res.send({
        done:false
    })
   }
}