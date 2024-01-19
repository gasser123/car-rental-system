import { Request, Response, NextFunction } from "express";
import CustomerStore from "../models/Customer";
import Validator from "../utilities/Validator";
import CarValidator from "../utilities/CarValidator";
const customerStore = new CustomerStore();
const validator = new Validator();
const carValidator = new CarValidator();
export const validateCustomerInputs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      driver_license_no,
      mobile_no,
    } = req.body;
    const validateFirstName = validator.validateName(first_name as unknown);
    const validateLastName = validator.validateName(last_name as unknown);
    const validateEmail = validator.validateEmail(email as unknown as string);
    const validatePassword = validator.validatePassword(password as unknown);
    const validateLicense = validator.validateLicense(
      driver_license_no as unknown
    );
    const validateMobileNo = validator.validateMobileNo(mobile_no as unknown);
    if (!validateFirstName) {
      throw new Error("invalid first name");
    }

    if (!validateLastName) {
      throw new Error("invalid last name");
    }

    if (!validateEmail) {
      throw new Error("invalid email");
    }

    if (!validatePassword) {
      throw new Error("invalid password");
    }

    if (!validateLicense) {
      throw new Error("invalid license number");
    }

    if (!validateMobileNo) {
      throw new Error("invalid mobile number");
    }

    next();
  } catch (error) {
    res.status(422);
    res.json(error);
  }
};

export const validateCustomerEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = req.body.email as unknown as string;
    const alreadyExists = await customerStore.emailAlreadyExists(email);
    if (alreadyExists) {
      res.status(200);
      res.json("email is already used");
    } else {
      next();
    }
  } catch (error) {
    res.status(500);
    res.json("error checking email");
  }
};

export const validateCarInputs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      validateColor,
      validateCountry,
      validateModel,
      validatePlate,
      validatePrice,
      validateStatus,
      validateURL,
      validateYear,
    } = carValidator;
    const {
      plate_id,
      model,
      year,
      status,
      price_per_day,
      country,
      color,
      image_url,
    } = req.body;
    const isValidColor = validateColor(color as unknown);
    const isValidCountry = validateCountry(country as unknown);
    const isValidModel = validateModel(model as unknown);
    const isValidPlate = validatePlate(plate_id as unknown);
    const isValidPrice = validatePrice(price_per_day as unknown);
    const isValidStatus = validateStatus(status as unknown);
    const isValidURL = validateURL(image_url as unknown);
    const isValidYear = validateYear(year as unknown);
    if (!isValidColor) {
      throw new Error("Invalid color");
    }

    if (!isValidURL) {
      throw new Error("Invalid image URL");
    }

    if (!isValidCountry) {
      throw new Error("Invalid country");
    }

    if (!isValidModel) {
      throw new Error("Invalid model");
    }

    if (!isValidPlate) {
      throw new Error("Invalid plate id");
    }

    if (!isValidYear) {
      throw new Error("Invalid year");
    }

    if (!isValidPrice) {
      throw new Error("Invalid price");
    }

    if (!isValidStatus) {
      throw new Error("Invalid status");
    }
    next();
  } catch (error) {
    res.status(422);
    res.json(error);
  }
};
