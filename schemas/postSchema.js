const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    type:String,
    user:mongoose.Schema.Types.ObjectId,
    message:String,
    date:String,
    likes:Number,
    comments:[
        {
            user:mongoose.Schema.Types.ObjectId,
            date:String,
            message:String
        }
    ]
})

module.exports = postSchema
