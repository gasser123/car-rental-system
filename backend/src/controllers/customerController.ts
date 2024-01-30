import CustomerStore, { CustomerInfo } from "../models/Customer";
import Customer from "../entities/customerEntity";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import RequestObject from "../entities/requestObject";
import CustomError from "../utilities/CustomError";
import { getCustomerReservations } from "../services/reservationServices";
dotenv.config();
const { TOKEN_SECRET } = process.env;
const store = new CustomerStore();

export const register = async (
  req: RequestObject,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer: Customer = {
      driver_license_no: req.body.driver_license_no as unknown as string,
      first_name: req.body.first_name as unknown as string,
      last_name: req.body.last_name as unknown as string,
      email: req.body.email as unknown as string,
      password: req.body.password as unknown as string,
      mobile_no: req.body.mobile_no as unknown as string,
    };

    const newCustomer = await store.createCustomer(customer);
    if (!newCustomer.verified) {
      throw new Error("couldn't obtain verification status");
    }
    const token = jwt.sign(
      { customer_id: newCustomer.id, verified: newCustomer.verified },
      TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );
    const expiration_time = 1000 * 60 * 60 * 24 * 7;
    res.cookie("token", token, {
      expires: new Date(Date.now() + expiration_time), // time until expiration
      secure: false, // set to true if you're using https
      httpOnly: true,
    });
    req.user_id = newCustomer.id;
    req.user_email = newCustomer.email;
    next();
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

export async function login(req: Request, res: Response) {
  try {
    const email = req.body.email as unknown as string;
    const password = req.body.password as unknown as string;
    const customer = await store.authenticate(email, password);
    if (customer != null) {
      if (!customer.verified) {
        throw new Error("couldn't obtain verification status");
      }
      const token = jwt.sign(
        { customer_id: customer.id, verified: customer.verified },
        TOKEN_SECRET as string,
        { expiresIn: "7d" }
      );
      const expiration_time = 1000 * 60 * 60 * 24 * 7;
      res.cookie("token", token, {
        expires: new Date(Date.now() + expiration_time), // time until expiration
        secure: false, // set to true if you're using https
        httpOnly: true,
      });

      res.status(200).json("logged in successfully");
    } else {
      res.status(200);
      res.json("invalid email or password");
    }
  } catch (error) {
    res.status(500);
    res.json(error);
  }
}

export function logout(req: Request, res: Response) {
  res.clearCookie("token", {
    secure: false,
    httpOnly: true,
  });
  res.status(200);
  res.json("logged out successfully");
}

export async function getProfile(req: RequestObject, res: Response) {
  try {
    const customer_id = req.user_id;

    if (!customer_id) {
      throw new CustomError("couldn't verify user", 401);
    }
    const customerInfo = await store.getCustomerInfo(customer_id);
    if (!customerInfo) {
      throw new CustomError("invalid token info", 401);
    }
    res.json(customerInfo);
  } catch (error) {
    res.clearCookie("token", {
      secure: false,
      httpOnly: true,
    });
    if (error instanceof CustomError) {
      res.status(error.status);
    } else {
      res.status(500);
    }

    res.json(`erroring getting user profile`);
  }
}

export const changePassword = async (req: RequestObject, res: Response) => {
  try {
    const customer_id = req.user_id;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      throw new CustomError("please confirm your password", 200);
    }

    if (!customer_id) {
      throw new CustomError("couldn't verify user", 401);
    }
    const check = await store.confirmCurrentPassword(
      customer_id,
      currentPassword as unknown as string
    );
    if (check) {
      await store.updateCustomerPassword(
        customer_id,
        newPassword as unknown as string
      );
      res.status(200);
      res.json("password changed successfully");
    } else {
      throw new CustomError("wrong current password", 200);
    }
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status);
    } else {
      res.status(500);
    }

    res.json(error);
  }
};

export async function updateProfile(req: RequestObject, res: Response) {
  try {
    const customer_id = req.user_id;
    if (!customer_id) {
      throw new CustomError("couldn't verify user", 401);
    }
    const {
      driver_license_no,
      first_name,
      last_name,
      email,
      mobile_no,
      password,
    } = req.body;
    const check = await store.confirmCurrentPassword(
      customer_id,
      password as unknown as string
    );
    if (!check) {
      throw new CustomError("wrong password", 200);
    }
    const customerInfo: CustomerInfo = {
      id: customer_id,
      driver_license_no: driver_license_no as unknown as string,
      first_name: first_name as unknown as string,
      last_name: last_name as unknown as string,
      email: email as unknown as string,
      mobile_no: mobile_no as unknown as string,
    };

    await store.updateCustomerInfo(customerInfo);
    res.status(200);
    res.json("profile updated successfully");
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status);
    } else {
      res.status(500);
    }

    res.json(error);
  }
}

export async function showCustomerReservations(
  req: RequestObject,
  res: Response
) {
  try {
    const user_id = req.user_id;
    if (!user_id) {
      throw new Error("user id not found");
    }

    const customerReservations = await getCustomerReservations(user_id);
    res.status(200);
    res.json(customerReservations);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
}

export async function activateAccount(req: RequestObject, res: Response) {
  try {
    const id = req.user_id;
    if (!id) {
      throw new Error("couldn't activate account user credential is missing");
    }
    await store.verifyCustomer(id);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
}

export async function passCustomerEmail(
  req: RequestObject,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.user_id;
    if (!id) {
      throw new Error("couldn't find user credential");
    }
    const customerInfo = await store.getCustomerInfo(id);
    if (!customerInfo) {
      res.clearCookie("token", {
        secure: false,
        httpOnly: true,
      });
      throw new Error("couldn't find user");
    }
    const { email } = customerInfo;
    req.user_email = email;
    next();
  } catch (error) {
    res.status(500);
    res.json(error);
  }
}

export async function checkVerified(
  req: RequestObject,
  res: Response,
  next: NextFunction
) {
  try {
    const customer_id = req.user_id;
    if (!customer_id) {
      res.clearCookie("token", {
        secure: false,
        httpOnly: true,
      });
      throw new Error("user credential not found");
    }
    const check = await store.isVerified(customer_id);
    if (check) {
      res.status(200);
      res.json("user account is already activated");
    }
    next();
  } catch (error) {
    res.status(500);
    res.json(error);
  }
}
