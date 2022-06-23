const { getAllSensors } = require("../controller/sensorController");
const Sensor = require("../models/SensorModel")
const LogModel = require("../models/LogModel");
const countdownFunc = async () => {
    const sensors = await Sensor.find();
    if (sensors !== []) {
        sensors.map(async (sensor) => {
            sensor.remainingTime = sensor.remainingTime - 1;
            if (sensor.remainingTime <= 0) {
                sensor.remainingTime = sensor.frequence
                console.log(`${sensor.sensorType} yazdırılacak`)
                sensor.sensorLogs.push({
                    value: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
                    date: new Date(Date.now()).toGMTString()
                })

            }
            await sensor.save();
        })
    }

}

module.exports = countdownFunc