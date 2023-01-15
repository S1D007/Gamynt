const User = require("../models/User")
const { v4: uuidv4 } = require('uuid');

module.exports.getUser = async (req, res) => {
  const { uid } = req.query
  try {
    User.findOne({ uid }).populate("joinedTournaments.tournament").populate("joinedClubs.club").exec(function (err, user) {
      if (err) console.log(err);
      res.send(user);
    });
    // console.log(doc)
  } catch (e) {
    console.log(e)
  }
}
module.exports.getUserByUsername = async (req, res) => {
  const { username } = req.query
  try {
    User.findOne({ username }).populate("joinedClubs.club").populate("joinedTournaments.tournament").populate("followers.user").exec(function (err, user) {
      if (err) console.log(err);
      res.send(user);
    });
    // console.log(doc)
  } catch (e) {
    console.log(e)
  }
  // res.send(doc)
}

module.exports.getUsers = async (req, res) => {
  const doc = await User.find({})
  const randUsers = doc.sort(() => Math.random() - 0.5);
  res.send(randUsers)
}
module.exports.addFollowers = async (req, res) => {
  const { value, myUid, hisUid } = req.query;
  console.log(value,myUid,hisUid)
  if (value === "1") {
    User.updateOne({ _id: hisUid }, { $inc: { followCount: 1 }, $push: { followers: { user: myUid } } }, (e) => {
    });
    User.updateOne({ _id: myUid }, { $inc: { followingCount: 1 }, $push: { following: { user: hisUid } } }, (e) => {
    });
    res.send({
      done: true
    })
  } else {
    User.updateOne({ _id: hisUid }, { $inc: { followCount: -1 }, $pull: { followers: { user: myUid } } }, (e) => {
    });
    User.updateOne({ _id: myUid }, { $inc: { followingCount: -1 }, $pull: { following: { user: hisUid } } }, (e) => {
    });
    res.send({
      done: true
    })
  }
}

module.exports.coins = async (req, res) => {
  const { email, amount } = req.query;
  const doc = await User.findOne({ email })
  const updatedCoins = amount < 0 ? doc.coins - Math.abs(amount) : doc.coins + amount;
  await User.updateOne({ email }, {
    coins: updatedCoins
  }).then((e) => {
    res.send(e)
  });
}
module.exports.editProfile = async (req, res) => {
  const { username, bio, email, avatar, name } = req.query;
  const doc = await User.findOne({ email })
  await User.updateOne({ email }, {
    username: username !== "" ? username : doc.username,
    bio: bio !== "" ? bio : doc.bio,
    avatar: avatar !== "" ? avatar : doc.avatar,
    name: name !== "" ? name : doc.name,
  }).then((e) => {
    res.send({
      done: true
    })
  })
}