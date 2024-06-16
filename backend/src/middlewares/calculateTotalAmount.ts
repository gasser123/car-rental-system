import { Response, NextFunction } from "express";
import RequestObject from "../entities/requestObject";
import CustomError from "../utilities/CustomError";
import CarStore from "../models/Car";
import { daysBetweenDates } from "../utilities/utilityFunctions";
const store = new CarStore();
async function calculateTotalAmount(
  req: RequestObject,
  res: Response,
  next: NextFunction
) {
  try {
    const pickup_date = req.body.pickup_date as string;
    const return_date = req.body.return_date as string;
    const id = req.car_id;
    if (!id) {
      throw new Error("car id not found");
    }
    const car = await store.getCar(id);
    if (!car) {
      throw new CustomError("car not found", 404);
    }
    const daysDifference = daysBetweenDates(pickup_date, return_date);
    const totalAmount = car.price_per_day * daysDifference;
    req.total_amount = totalAmount;
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
export default calculateTotalAmount;
