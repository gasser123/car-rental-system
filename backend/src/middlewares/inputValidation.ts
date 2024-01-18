import { Request, Response, NextFunction } from "express";
import CustomerStore from "../models/Customer";
import Validator from "../utilities/Validator";
const customerStore = new CustomerStore();
const validator = new Validator();

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
    const validateFirstName = validator.validateName(
      first_name as unknown as string
    );
    const validateLastName = validator.validateName(
      last_name as unknown as string
    );
    const validateEmail = validator.validateEmail(email as unknown as string);
    const validatePassword = validator.validatePassword(
      password as unknown as string
    );
    const validateLicense = validator.validateLicense(
      driver_license_no as unknown as string
    );
    const validateMobileNo = validator.validateMobileNo(mobile_no);
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
