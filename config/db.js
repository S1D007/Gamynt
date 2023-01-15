const mongoose = require("mongoose")

const url = `mongodb+srv://Gamynt-Backend-Database:gamyntapp123@cluster0.gsftklo.mongodb.net/Database?retryWrites=true&w=majority`

const connectToDatabase = () => {
    mongoose
      .connect(url)
      .then(() => {
        console.log("Connection Succesfull");
      })
      .catch((e) => {
        console.log(`Error Occured Because > \n 
      ${e.message}
      `);
      });
};

module.exports = connectToDatabase;
