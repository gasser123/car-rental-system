import { NextFunction, Response, Request } from "express";
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
    const { customer_id, verified } = payLoad;
    req.user_id = customer_id;
    req.verified = verified;
    next();
  } catch (error) {
    res.status(401);
    res.clearCookie("token", {
      secure: false,
      httpOnly: true,
    });
    res.clearCookie("logged", {
      secure: false,
      httpOnly: false,
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
    res.status(401);
    res.clearCookie("token", {
      secure: false,
      httpOnly: true,
    });
    res.clearCookie("logged", {
      secure: false,
      httpOnly: false,
    });
    res.json("erroring verifying token");
  }
};

export const verifyCustomerLoggedIn = (req: Request, res: Response): void => {
  try {
    const token = req.cookies.token || "";
    if (!token) {
      throw new Error("no token found");
    }
    // if invalid it throws an error
    jwt.verify(token, TOKEN_SECRET as unknown as string);

    res.status(200);
    res.json("customer is logged in");
  } catch (error) {
    res.status(401);
    res.clearCookie("token", {
      secure: false,
      httpOnly: true,
    });
    res.json("erroring verifying token");
  }
};

export const verifyAdminLogggedIn = (
  req: RequestObject,
  res: Response
): void => {
  try {
    const token = req.cookies.token || "";
    if (!token) {
      throw new Error("no token found");
    }
    // if invalid it throws an error
    jwt.verify(token, ADMIN_TOKEN_SECRET as string);
    res.status(200);
    res.json("admin is logged in");
  } catch (error) {
    res.status(401);
    res.clearCookie("token", {
      secure: false,
      httpOnly: true,
    });
    res.json("erroring verifying token");
  }
};
