import CustomerStore, { CustomerInfo } from "../models/Customer";
import Customer from "../entities/customerEntity";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import {
  validateCustomerEmail,
  validateCustomerInputs,
} from "../middlewares/inputValidation";
import verifyAuthToken from "../middlewares/jwtValidation";
import RequestObject from "../entities/requestObject";
dotenv.config();
const { TOKEN_SECRET } = process.env;
const store = new CustomerStore();
const register = async (req: Request, res: Response) => {
  try {
    const customer: Customer = {
      driver_license_no: req.body.driver_license_no,
      first_name: req.body.first_name as unknown as string,
      last_name: req.body.last_name as unknown as string,
      email: req.body.email as unknown as string,
      password: req.body.password as unknown as string,
      mobile_no: req.body.mobile_no as unknown as string,
    };

    const newCustomer = await store.createCustomer(customer);
    const token = jwt.sign(
      { customer_id: newCustomer.id },
      TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );
    const expiration_time = 1000 * 60 * 60 * 24 * 7;
    res.cookie("token", token, {
      expires: new Date(Date.now() + expiration_time), // time until expiration
      secure: false, // set to true if you're using https
      httpOnly: true,
    });

    res.status(200).json({ message: "registered successfully" });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

async function login(req: Request, res: Response) {
  try {
    const email = req.body.email as unknown as string;
    const password = req.body.password as unknown as string;
    const customer = await store.authenticate(email, password);
    if (customer != null) {
      const token = jwt.sign(
        { customer_id: customer.id },
        TOKEN_SECRET as string,
        { expiresIn: "7d" }
      );
      const expiration_time = 1000 * 60 * 60 * 24 * 7;
      res.cookie("token", token, {
        expires: new Date(Date.now() + expiration_time), // time until expiration
        secure: false, // set to true if you're using https
        httpOnly: true,
      });

      res.status(200).json({ message: "logged in successfully" });
    } else {
      res.json("invalid email or password");
    }
  } catch (error) {
    res.status(400);
    res.json(error);
  }
}

async function logout(req: Request, res: Response) {
  res.clearCookie("token", {
    secure: false,
    httpOnly: true,
  });
}

async function getProfile(req: RequestObject, res: Response) {
  try {
    const customer_id = req.user_id;

    if (!customer_id) {
      throw new Error("couldn't verify user");
    }
    const customerInfo = await store.getCustomerInfo(customer_id);
    if (!customerInfo) {
      throw new Error("invalid token info");
    }
    res.json(customerInfo);
  } catch (error) {
    res.clearCookie("token", {
      secure: false,
      httpOnly: true,
    });
    res.status(401);
    res.json(`erroring getting user profile`);
  }
}

const changePassword = async (req: RequestObject, res: Response) => {
  try {
    const customer_id = req.user_id;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      throw new Error("please confirm your password");
    }

    if (!customer_id) {
      throw new Error("couldn't verify user");
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
    } else {
      throw new Error("wrong current password");
    }
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

async function updateProfile(req: RequestObject, res: Response) {
  try {
    const customer_id = req.user_id;
    if (!customer_id) {
      throw new Error("couldn't verify user");
    }
    const {
      driver_license_no,
      first_name,
      last_name,
      email,
      mobile_no,
      currentPassword,
    } = req.body;
    const check = await store.confirmCurrentPassword(
      customer_id,
      currentPassword as unknown as string
    );
    if (!check) {
      throw new Error("wrong password");
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
  } catch (error) {
    res.status(500);
    res.json(error);
  }
}

const customerRoutes = (app: express.Application) => {
  app.post(
    "/register",
    validateCustomerInputs,
    validateCustomerEmail,
    register
  );
  app.post("/login", login);
  app.post("/logout", logout);
  app.get("/profile", verifyAuthToken, getProfile);
  app.patch("/changepassword", verifyAuthToken, changePassword);
  app.patch(
    "/updateprofile",
    validateCustomerInputs,
    validateCustomerEmail,
    verifyAuthToken,
    updateProfile
  );
};

export default customerRoutes;
