import { Response, NextFunction } from "express";
import RequestObject from "../entities/requestObject";
import CustomError from "../utilities/CustomError";
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
      throw new CustomError(
        "car country and location countries are not the same",
        422
      );
    }
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
export default validateCountries;
