const express = require("express")
const app = express()
const fileUpload = require("express-fileupload")
const connectToDatabase = require("./config/db");
const ClubServer = require("./models/ClubServer.js")
const routes = require("./routes/routes")
const server = require("http").createServer(app)
const io = require("socket.io")(server,{
    cors:{
        origin:"*"
    }
})
const cors = require("cors");
const User = require("./models/User");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
connectToDatabase();
app.use(fileUpload({
    useTempFiles: true
}))
const PORT = process.env.PORT || 8080

app.use(routes)

app.get("/", (req, res) => {
    res.send("Gamynt Backend")
})


io.on('connection', (socket) => {
    socket.on("club-chat", async (payloads) => {
        // First, use emit to broadcast the message to all connected clients
        io.emit("chats", payloads);

        // Then, use findOneAndUpdate to update the messages array in one query
        await ClubServer.updateOne({ _id: payloads._id }, 
            { $push: { ['channelList.' + payloads.index + '.messages']: { message: payloads.message, user: payloads.user, date: payloads.date } } });
    });
});

// function nti (){
//     User.updateMany({}, { $set: { likedPost: [{}] } }, function(error, result) {
//         if (error) {
//           console.log(error)
//         } else {
//             console.log(result)
//         }
//       });
// }
// nti()

server.listen(PORT,(e)=>{
    console.log("connected at http://localhost:8080")
})


