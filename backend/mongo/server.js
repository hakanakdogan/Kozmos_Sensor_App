const express = require("express");
//const connectDataBase = require("./helper/dbConnect");
const cors = require("cors");
const router = require("./routers/index");
const countdownFunc = require("./helper/countdown");
const mongoose = require("mongoose");




const PORT = 3000;
//connectDataBase();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/sensorapi", router);




const uri = "mongodb+srv://hakanakdogan:159753@hakanakdogan.goujj.mongodb.net/?retryWrites=true&w=majority";

let isConnected = false;


const connectDataBase = async () => {

    mongoose.connect(uri)
        .then(() => {
            console.log("MongoDB Connection Successfull");
            isConnected = true

        })
        .catch((err) => {
            console.log(err);
            isConnected = false
        })
}



connectDataBase();
setInterval(() => {
    if (isConnected) countdownFunc();
}, 1000)













app.listen(PORT, () => {
    console.log(`Server active and running on port : ${PORT}`);
})