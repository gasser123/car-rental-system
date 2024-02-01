import {
  verifyAdminToken,
  verifyAuthToken,
} from "../middlewares/jwtValidation";
import { Application } from "express";
import { RentCar } from "../controllers/carController";
import {
  makeAReservation,
  showAllReservations,
} from "../controllers/reservationController";
const reservationRoutes = (app: Application) => {
  app.post("/reservations", verifyAuthToken, makeAReservation, RentCar);
  app.get("/reservations", verifyAdminToken, showAllReservations);
};

export default reservationRoutes;
