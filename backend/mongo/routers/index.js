const express = require("express");
const router = express.Router();

const { newMap, getMap } = require("../controller/mapControllers");
const { addNewSensor, getAllSensors, getSensorById, deleteSensor } = require("../controller/sensorController");

/*--------------------------Map Routers----------------------  */
router.post("/newmap", newMap);

router.get("/getmap", getMap);



/*--------------------------Sensor Routers----------------------  */

router.post("/newsensor", addNewSensor);
router.get("/getallsensors", getAllSensors);
router.get("/getsensorbyid/:id", getSensorById);
router.delete("/removesensor/:id", deleteSensor);

module.exports = router;

