import Home from "views/Home.js";
import AddSensor from "views/AddSensor.js";
import SensorSummary from "views/SensorSummary.js";
import SensorDetails from './views/SensorDetails';

const routes = [
  {
    path: "/home",
    name: "Anasayfa",
    icon: "nc-icon nc-atom",
    component: Home,
    layout: "/kozmos",
  },
  {
    path: "/add-sensor",
    name: "Sensör Ekle",
    icon: "nc-icon nc-pin-3",
    component: AddSensor,
    layout: "/kozmos",
  },
  {
    path: "/sensor-summary",
    name: "Sensör Özet",
    icon: "nc-icon nc-paper-2",
    component: SensorSummary,
    layout: "/kozmos",
  },
  {
    path: "/sensor-details/:id",
    component: SensorDetails,
    layout: "/kozmos"
  },
];

export default routes;
