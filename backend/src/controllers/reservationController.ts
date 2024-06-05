import { NextFunction, Request, Response } from "express";
import RequestObject from "../entities/requestObject";
import CustomError from "../utilities/CustomError";
import ReservationStore from "../models/Reservation";
import Reservation from "../entities/reservationEntity";
import {
  getAdminReservations,
  getAdminUnconfirmedReservations,
  allReservationsAdvancedSearch,
  unconfirmedReservationsAdvancedSearch,
} from "../services/reservationServices";
import AdminReservationInfo from "../entities/AdminReservationInfo";
const store = new ReservationStore();
export async function makeAReservation(
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
    const car_id = req.query.car_id;
    if (!car_id) {
      throw new CustomError("car id is missing", 422);
    }
    const reservation: Reservation = {
      car_id: parseInt(car_id as string),
      customer_id: customer_id,
      pickup_date: req.query.pickup_date as string,
      return_date: req.query.return_date as string,
      pickup_location_id: parseInt(req.query.pickup_location_id as string),
      return_location_id: parseInt(req.query.return_location_id as string),
      total_amount: total_amount,
    };
    await store.createReservation(reservation);
    req.car_id = reservation.car_id;
    next();
  } catch (error) {
    let message = "";
    if (error instanceof CustomError) {
      res.status(error.status);
      message = error.message;
    } else if (error instanceof Error) {
      res.status(500);
      message = error.message;
    }

    res.json(message);
  }
}

export async function showAllReservations(req: Request, res: Response) {
  try {
    const reservations = await store.getAllReservations();
    res.json(reservations);
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500);
    res.json(message);
  }
}

export async function showAllAdminReservationsInfo(
  req: Request,
  res: Response
) {
  try {
    const value = req.query.search;
    let reservations: AdminReservationInfo[] | null = null;
    if (value === undefined) {
      reservations = await getAdminReservations();
    } else {
      reservations = await allReservationsAdvancedSearch(value as string);
    }

    res.json(reservations);
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500);
    res.json(message);
  }
}

export async function showUnconfirmedReservations(req: Request, res: Response) {
  try {
    const reservations = await store.getUnconfirmedReservations();
    res.json(reservations);
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500);
    res.json(message);
  }
}

export async function showAdminUnconfirmedReservationsInfo(
  req: Request,
  res: Response
) {
  try {
    const value = req.query.search;
    let reservations: AdminReservationInfo[] | null = null;
    if (value === undefined) {
      reservations = await getAdminUnconfirmedReservations();
    } else {
      reservations = await unconfirmedReservationsAdvancedSearch(
        value as string
      );
    }

    res.json(reservations);
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500);
    res.json(message);
  }
}

export async function confirmReservation(req: RequestObject, res: Response) {
  try {
    const value = req.params.id;
    if (!value) {
      throw new CustomError("reservation id is missing", 422);
    }
    const id = parseInt(value);
    await store.updateConfirmReservation(id);
  } catch (error) {
    let message = "";
    if (error instanceof CustomError) {
      res.status(error.status);
      message = error.message;
    } else if (error instanceof Error) {
      res.status(500);
      message = error.message;
    }

    res.json(message);
  }
}
