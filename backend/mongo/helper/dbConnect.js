const mongoose = require("mongoose");

const uri = "mongodb+srv://hakanakdogan:159753@hakanakdogan.goujj.mongodb.net/?retryWrites=true&w=majority";




const connectDataBase = async () => {

    mongoose.connect(uri)
        .then(() => {
            console.log("MongoDB Connection Successfull");
            return true
        })
        .catch((err) => {
            console.log(err);
            return false;
        })
}


module.exports = connectDataBase;