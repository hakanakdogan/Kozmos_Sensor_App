const Map = require("../models/MapModel");

const newMap = async (req, res, next) => {
    const mapInfo = req.body;
    try {
        const map = new Map({
            ...mapInfo
        })
        await map.save();

        res.status(201).json({
            success: true,
            data: map
        })
    } catch (error) {
        res.status(400).json({
            success: true,
            data: error.message
        })
    }
}


const getMap = async (req, res, next) => {
    try {
        const map = await Map.find();

        res.status(200).json(map);
    } catch (error) {
        res.status(404).json({
            err: error.message
        })
    }
}

module.exports = {
    newMap,
    getMap
}