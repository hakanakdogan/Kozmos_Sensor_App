const Sensor = require("../models/SensorModel")

const Map = require("../models/MapModel");

const addNewSensor = async (req, res, next) => {
    const sensorInfo = req.body;
    try {

        const map = await Map.find();
        const distance = Math.sqrt(Math.pow((sensorInfo.x_coordinate - map[0].x_coordinate), 2) + Math.pow((sensorInfo.y_coordinate - map[0].y_coordinate), 2))
        const mapRadius = map[0].radius;

        if (distance <= mapRadius) {

            const sensor = new Sensor({
                ...sensorInfo,
                remainingTime: sensorInfo.frequence
            });

            await sensor.save();

            res.status(200).json({
                success: true,
                data: sensor
            })

        } else {
            res.status(400).json({
                success: false,
                err: "Sensor cannot be placed outside of the map."
            })
        }



    } catch (error) {
        res.status(400).json({
            success: false,
            err: error.message
        })
    }
}

const getAllSensors = async (req, res, next) => {
    try {
        const sensors = await Sensor.find();
        res.status(200).json({
            success: true,
            data: sensors
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            err: error.message
        })
    }
}

const getSensorById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const sensor = await Sensor.findOne({
            _id: id
        })
        res.status(200).json({
            success: true,
            data: sensor
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            err: error.message
        })
    }

}

const deleteSensor = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Sensor.deleteOne({ _id: id });
        res.status(200).json({
            success: true,
            data: "Sensor removed successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            err: error.message
        })
    }
}

module.exports = {
    addNewSensor,
    getAllSensors,
    getSensorById,
    deleteSensor
}