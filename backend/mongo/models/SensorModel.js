const mongoose = require("mongoose");
const LogModel = require("./LogModel");

const Schema = mongoose.Schema;

const Sensor = new Schema({

    x_coordinate: {
        type: Number,
        required: true,

    },
    y_coordinate: {
        type: Number,
        required: true,

    },
    frequence: {
        type: Number,
        required: true
    },
    sensorType: {
        type: String,
        required: true
    },
    sensorLogs: {
        type: [LogModel],
        required: true

    },
    remainingTime: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model("Sensor", Sensor);