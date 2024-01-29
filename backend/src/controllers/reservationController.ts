import { Application, NextFunction, Request, Response } from "express";
import {
  verifyAdminToken,
  verifyAuthToken,
} from "../middlewares/jwtValidation";
import RequestObject from "../entities/requestObject";
import CustomError from "../utilities/CustomError";
import ReservationStore from "../models/Reservation";
import Reservation from "../entities/reservationEntity";
import { RentCar } from "./carController";
const store = new ReservationStore();
async function makeAReservation(
  req: RequestObject,
  res: Response,
  next: NextFunction
) {
  try {
    const customer_id = req.user_id;
    if (!customer_id) {
      throw new CustomError("user is not verified", 401);
    }
    const total_amount = req.total_amount;
    if (!total_amount) {
      throw new CustomError("total amount isn't declared", 500);
    }
    const reservation: Reservation = {
      car_id: req.body.car_id as unknown as number,
      customer_id: customer_id,
      pickup_date: req.body.pickup_date as unknown as string,
      return_date: req.body.return_date as unknown as string,
      pickup_location_id: req.body.pickup_location_id as unknown as number,
      return_location_id: req.body.return_location_id,
      total_amount: total_amount,
    };
    await store.createReservation(reservation);
    req.car_id = reservation.car_id;
    next();
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status);
    } else {
      res.status(500);
    }

    res.json(error);
  }
}

async function showAllReservations(req: Request, res: Response) {
  try {
    const reservations = await store.getAllReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
}

const reservationRoutes = (app: Application) => {
  app.post("/reservations", verifyAuthToken, makeAReservation, RentCar);
  app.get("/reservations", verifyAdminToken, showAllReservations);
};

export default reservationRoutes;
