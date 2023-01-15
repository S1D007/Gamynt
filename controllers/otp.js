const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')
const OTP = require("../models/OtpVerification")
const User = require("../models/User.js")
const { v4: uuidv4 } = require('uuid');
const {AvatarGenerator} = require('random-avatar-generator')
var randomAvatar = require('random-avatar');
// initialize nodemailer
const { uniqueNamesGenerator, Config, adjectives, colors, animals, names, starWars } = require("unique-names-generator")
// usernames

const customConfig = {
    dictionaries: [adjectives, colors],
    separator: '_',
    length: 2,
};
const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals, starWars, names]
});

module.exports.otp = async (req, res) => {
    var transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: 'birendrakumarsingh137@gmail.com',
                pass: 'xrebmfqmhsibidht'
            }
        }
    );

    // point to the template folder
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
    };

    // use a template file with nodemailer
    transporter.use('compile', hbs(handlebarOptions))
    const { email } = req.query;
    const password = Math.floor(Math.random() * 100000)
    const d = new Date().toLocaleDateString()
    var mailOptions = {
        from: '"Siddhant" <birendrakumarsingh137@gmail.com>', // sender address
        to: email.toLowerCase(), // list of receivers
        subject: 'Welcome, OTP for Authentcation in Gamynt',
        template: 'email', // the name of the template file i.e email.handlebars
        context: {
            // name: "Adebola", // replace {{name}} with Adebola
            pass: password,
            time: `${d}`
        }
    };

    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            return console.log(error);
        } else {
            const emailThere = await OTP.findOne({ email })
            // console.log(emailThere)
            if (emailThere) {
                emailThere.otp = password
                await emailThere.save()
            } else {
                const doc = new OTP({
                    email:email.toLowerCase(),
                    otp: password
                })
                await doc.save()
            }
            res.send(info)
            // console.log(info)
        }
    });
}

module.exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.query;
    const otpAvailable = await OTP.findOne({ email })
    const username = uniqueNamesGenerator(customConfig);
    const userExist = await User.findOne({ email })
    const generatorAvatar = new AvatarGenerator()
    if (otpAvailable && otp === otpAvailable.otp.toString()) {
        if (userExist) {
            await OTP.findOne({ email }).remove()
            res.send({
                verified: true,
                userData:userExist
            })
        }else{
            const doc = new User({
                username,
                email,
                bio:"I love Gamynt",
                joinedClubs: [],
                avatar: generatorAvatar.generateRandomAvatar(username),
                banner: "",
                joinedTournaments: [],
                uid: uuidv4(),
                tags: [
                    {
                        name: "Newbie",
                        tag: "https://cdn3d.iconscout.com/3d/premium/thumb/game-controller-4790165-3988746.png"
                    },
                ],
                gamesIPlay: [],
                crew: [],
                balance: 0,
                followers: [],
                following: [],
                followCount:0,
                followingCount:0,
                post: [],
                directMessage: [],
                notifications:[],
                coins:0,
                diamonds:0,
                name:"",
                isVerified:false,
                subscription:[],
                phone:"",
                ip_address:"",
                state:""
            })
            await OTP.findOne({ email }).remove()
            await doc.save()
            res.send({
                verified: true,
                userData: doc
            })
        }
    }

}