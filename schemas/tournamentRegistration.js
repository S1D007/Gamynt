const mongoose = require("mongoose")

const TournamentRegistrationSchema = mongoose.Schema({
    bannerImgUrl:{
        type:String
    },
    title:{
        type:String,
        // required:true
    },
    game:{
        type:String,
        // required:true
    },
    mode:{
        type:String
    },
    id:{
        type:String
    },
    slot:{
        type:Number
    },
    club:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Club"
    },
    EntryFees:{
        type:String
    },
    participiants:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        }
    ],
    tags:{
        type:mongoose.Schema.Types.Array
    },
    description:{
        type:String
    },
    PrizePool:{
        type:Number
    },
    schedule:{
        type:String
    },
    advance:[{
        advanceType:String,
        advanceAmount:Number,
        duration:String
    }],
    creds:{
        id:String,
        pass:String
    },
    rules:String,
    winners:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
            ref:"User"
            },
            position:String
        }
    ]
})

module.exports = TournamentRegistrationSchema
