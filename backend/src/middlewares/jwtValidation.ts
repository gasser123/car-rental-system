import { NextFunction, Response } from "express";
import RequestObject from "../entities/requestObject";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import CustomerPayload from "../entities/customerjwt";
import AdminPayload from "../entities/adminjwt";
dotenv.config();
const { TOKEN_SECRET, ADMIN_TOKEN_SECRET } = process.env;

export const verifyAuthToken = (
  req: RequestObject,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies.token || "";
    if (!token) {
      throw new Error("no token found");
    }
    // if invalid it throws an error
    const payLoad: CustomerPayload = jwt.verify(
      token,
      TOKEN_SECRET as unknown as string
    ) as CustomerPayload;
    const { customer_id } = payLoad;
    req.user_id = customer_id;
    next();
  } catch (error) {
    res.clearCookie("token", {
      secure: false,
      httpOnly: true,
    });
    res.json("erroring verifying token");
  }
};

export const verifyAdminToken = (
  req: RequestObject,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies.token || "";
    if (!token) {
      throw new Error("no token found");
    }
    // if invalid it throws an error
    const payLoad: AdminPayload = jwt.verify(
      token,
      ADMIN_TOKEN_SECRET as string
    ) as AdminPayload;
    const { admin_id, admin_role } = payLoad;
    req.user_id = admin_id;
    req.role = admin_role;
    next();
  } catch (error) {
    res.clearCookie("token", {
      secure: false,
      httpOnly: true,
    });
    res.json("erroring verifying token");
  }
};


