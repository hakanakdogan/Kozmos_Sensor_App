const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Map = new Schema({
    radius: {
        type: Number,
        required: true,

    },
    x_coordinate: {
        type: Number,
        required: true,

    },
    y_coordinate: {
        type: Number,
        required: true,

    },

})


module.exports = mongoose.model("Map", Map);