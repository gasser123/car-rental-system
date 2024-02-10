import { Response, NextFunction } from "express";
import RequestObject from "../entities/requestObject";
async function validateCountries(
  req: RequestObject,
  res: Response,
  next: NextFunction
) {
  try {
    const { car_country, pickup_country, return_country } = req;
    if (!car_country) {
      throw new Error("car country is missing");
    }
    if (!pickup_country) {
      throw new Error("pickup country is missing");
    }
    if (!return_country) {
      throw new Error("return country is missing");
    }

    if (car_country === pickup_country && car_country === return_country) {
      next();
    } else {
      throw new Error("car country and location countries are not the same");
    }
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      res.status(500);
      message = error.message;
    }
    res.json(message);
  }
}
export default validateCountries;