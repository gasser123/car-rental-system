import { Request, Response, NextFunction } from "express";
import CustomerStore from "../models/Customer";
import Validator from "../utilities/Validator";
import CarValidator from "../utilities/CarValidator";
import LocationValidator from "../utilities/LocationValidator";
import isValidId from "../utilities/idValidate";
import AdminStore from "../models/Admin";
import RequestObject from "../entities/requestObject";
import { CustomerInfo } from "../models/Customer";
import CustomError from "../utilities/CustomError";
const customerStore = new CustomerStore();
const validator = new Validator();
const carValidator = new CarValidator();
const adminStore = new AdminStore();
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
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(422);
    res.json(message);
  }
};

export const validateEditCustomerInputs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { first_name, last_name, driver_license_no, mobile_no } = req.body;
    const validateFirstName = validator.validateName(first_name as unknown);
    const validateLastName = validator.validateName(last_name as unknown);
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

    if (!validateLicense) {
      throw new Error("invalid license number");
    }

    if (!validateMobileNo) {
      throw new Error("invalid mobile number");
    }

    next();
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(422);
    res.json(message);
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

export const validateEditCustomerEmail = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.user_id;
    if (!id) {
      throw new Error("user credential is missing");
    }
    const value = req.body.email as unknown;
    const validateEmail = validator.validateEmail(value);
    if (!validateEmail) {
      throw new CustomError("invalid email address", 422);
    }
    const email = value as string;
    const alreadyExists = await customerStore.editEmailAlreadyExists(email, id);
    if (alreadyExists) {
      res.status(200);
      res.json("email is already used");
    } else {
      next();
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
};

export const checkLicenseAlreadyExists = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const license = req.body.driver_license_no as unknown as string;
    const alreadyExists = await customerStore.licenseAlreadyExists(license);
    if (alreadyExists) {
      res.status(200);
      res.json("license is already used");
    } else {
      next();
    }
  } catch (error) {
    res.status(500);
    res.json("error checking email");
  }
};

export const checkEditLicenseAlreadyExists = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const customer_id = req.user_id;
    if (!customer_id) {
      throw new Error("couldn't verify user");
    }
    const { driver_license_no, first_name, last_name, mobile_no } = req.body;

    const customerInfo: CustomerInfo = {
      id: customer_id,
      driver_license_no: driver_license_no as unknown as string,
      first_name: first_name as unknown as string,
      last_name: last_name as unknown as string,
      mobile_no: mobile_no as unknown as string,
    };
    const alreadyExists = await customerStore.editLicenseAlreadyExists(
      customerInfo
    );
    if (alreadyExists) {
      res.status(200);
      res.json("license is already used");
    } else {
      next();
    }
  } catch (error) {
    res.status(500);
    res.json("error checking email");
  }
};

export const validateCarInputs = (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
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
    const isValidColor = carValidator.validateColor(color as unknown);
    const isValidCountry = carValidator.validateCountry(country as unknown);
    const isValidModel = carValidator.validateModel(model as unknown);
    const isValidPlate = carValidator.validatePlate(plate_id as unknown);
    const isValidPrice = carValidator.validatePrice(price_per_day as unknown);
    const isValidStatus = carValidator.validateStatus(status as unknown);
    const isValidURL = carValidator.validateURL(image_url as unknown);
    const isValidYear = carValidator.validateYear(year as unknown);
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
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(422);
    res.json(message);
  }
};

export const validateLocationInputs = (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const locationValidator = new LocationValidator();
    const country = req.body.country as unknown;
    const city = req.body.city as unknown;
    const address = req.body.address as unknown;

    const isValidCountry = locationValidator.validateInput(country);
    const isValidCity = locationValidator.validateInput(city);
    const isValidAddress = locationValidator.validateInput(address);
    if (!isValidCountry) {
      throw new Error("invalid country input");
    }

    if (!isValidAddress) {
      throw new Error("invalid address input");
    }
    if (!isValidCity) {
      throw new Error("invalid city input");
    }

    next();
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(422);
    res.json(message);
  }
};

export const validateId = (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.query.id as string);
    const isValid = isValidId(id);
    if (!isValid) {
      throw new Error("invalid id");
    }

    next();
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(422);
    res.json(message);
  }
};

export const validateAdminSignup = (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const first_name = req.body.first_name as unknown;
    const last_name = req.body.last_name as unknown;
    const email = req.body.email as unknown;
    const password = req.body.password as unknown;

    const isValidFirst_name = validator.validateName(first_name);
    const isValidLast_name = validator.validateName(last_name);
    const isValidEmail = validator.validateEmail(email);
    const isValidPassword = validator.validatePassword(password);

    if (!isValidFirst_name) {
      throw new Error("invalid first name");
    }

    if (!isValidLast_name) {
      throw new Error("invalid last name");
    }

    if (!isValidEmail) {
      throw new Error("invalid email");
    }

    if (!isValidPassword) {
      throw new Error("invalid password");
    }

    next();
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(422);
    res.json(message);
  }
};

export const validateEditAdminSignup = (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const first_name = req.body.first_name as unknown;
    const last_name = req.body.last_name as unknown;
    const isValidFirst_name = validator.validateName(first_name);
    const isValidLast_name = validator.validateName(last_name);

    if (!isValidFirst_name) {
      throw new Error("invalid first name");
    }

    if (!isValidLast_name) {
      throw new Error("invalid last name");
    }

    next();
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(422);
    res.json(message);
  }
};
export const validateAdminEmail = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const email = req.body.email as unknown as string;
    const alreadyExists = await adminStore.emailAlreadyExists(email);
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

export const validateLoginInputs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email as unknown;
    const password = req.body.password as unknown;
    const isValidEmail = validator.validateEmail(email);
    const isValidPassword = validator.validatePassword(password);
    if (!isValidEmail) {
      throw new Error("invalid email");
    }

    if (!isValidPassword) {
      throw new Error("invalid password");
    }

    next();
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(422);
    res.json(message);
  }
};

export const changePasswordValidate = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const checkCurrentPassword = validator.validatePassword(currentPassword);
    const checkNewPassword = validator.validatePassword(newPassword);
    const checkConfirmPassword = validator.validatePassword(confirmPassword);
    if (!checkCurrentPassword) {
      throw new Error("invalid current password");
    }
    if (!checkNewPassword) {
      throw new Error("invalid new password");
    }

    if (!checkConfirmPassword) {
      throw new Error("invalid confirm password");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("please confirm your password");
    }
    next();
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(422);
    res.json(message);
  }
};

export const changePasswordResetValidate = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const checkNewPassword = validator.validatePassword(newPassword);
    const checkConfirmPassword = validator.validatePassword(confirmPassword);
    if (!checkNewPassword) {
      throw new Error("invalid new password");
    }

    if (!checkConfirmPassword) {
      throw new Error("invalid confirm password");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("please confirm your password");
    }
    next();
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(422);
    res.json(message);
  }
};
