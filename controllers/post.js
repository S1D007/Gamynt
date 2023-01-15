const Post = require("../models/Post")
const User = require("../models/User")
module.exports.createPost = async (req,res) => {
    const {uid,username,message,type,image} = req.query
    const userDoc = await User.findOne({username})
    const doc = new Post({
        type,
        uid,
        message,
        username:username === userDoc.username?username:userDoc.username,
        image,
        avatar:userDoc.avatar,
        date:new Date().toUTCString(),
        likes:0,
        comments:[]
    })
    await doc.save()
    // userDoc.post.push({
    //     type,
    //     message,
    //     image
    // })
    // await userDoc.save()
    res.send({
        done:true
    })
}
module.exports.getPosts = async(req,res) => {
    const doc = await Post.find({})
    const randomDoc = doc.sort(()=>-1)
    res.send(randomDoc)
}

module.exports.like = async (req,res) =>{
    const {value,username} = req.query
    if (value === "1") {
        Post.updateOne({ username }, { $inc: { likes: 1 }}, (e) => {
            // console.log(e)
          });
        res.send({
          done:true
        })
      } else {
        Post.updateOne({ username }, { $inc: { likes: -1 }}, (e) => {
          // console.log(e)
        });
      }
      res.send({
        done:true
      })
}