import { Application, Request, Response } from "express";
import AdminStore, { AdminInfo } from "../models/Admin";
import Admin from "../entities/adminEntity";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  validateAdminSignup,
  validateAdminEmail,
  validateLoginInputs,
  validateCarInputs,
} from "../middlewares/inputValidation";
import RequestObject from "../entities/requestObject";
import CustomError from "../utilities/CustomError";
import { verifyAdminToken } from "../middlewares/jwtValidation";
import { addCar, editCar } from "./carController";
dotenv.config();
const { ADMIN_TOKEN_SECRET } = process.env;
const store = new AdminStore();
export const register = async (req: Request, res: Response) => {
  try {
    const admin: Admin = {
      first_name: req.body.first_name as unknown as string,
      last_name: req.body.last_name as unknown as string,
      email: req.body.email as unknown as string,
      password: req.body.password as unknown as string,
      role: "admin",
    };

    await store.createAdmin(admin);

    res.status(200).json("registered successfully");
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

export async function login(req: Request, res: Response) {
  try {
    const email = req.body.email as unknown as string;
    const password = req.body.password as unknown as string;
    const admin = await store.authenticate(email, password);
    if (admin != null) {
      const token = jwt.sign(
        { admin_id: admin.id, admin_role: admin.role },
        ADMIN_TOKEN_SECRET as string,
        { expiresIn: "3h" }
      );
      const expiration_time = 1000 * 60 * 60 * 3;
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
    const admin_id = req.user_id;

    if (!admin_id) {
      throw new CustomError("couldn't verify user", 401);
    }
    const adminInfo = await store.getAdminInfo(admin_id);
    if (!adminInfo) {
      throw new CustomError("invalid token info", 401);
    }
    res.json(adminInfo);
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

export async function updateProfile(req: RequestObject, res: Response) {
  try {
    const admin_id = req.user_id;
    if (!admin_id) {
      throw new CustomError("couldn't verify user", 401);
    }
    const adminInfo: AdminInfo = {
      id: admin_id,
      first_name: req.body.first_name as unknown as string,
      last_name: req.body.last_name as unknown as string,
      email: req.body.email as unknown as string,
    };

    const password = req.body.password as unknown as string;
    const check = await store.confirmCurrentPassword(admin_id, password);
    if (!check) {
      throw new CustomError("wrong password", 200);
    }

    await store.updateAdminInfo(adminInfo);
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

export async function removeAdmin(req: RequestObject, res: Response) {
  try {
    const role = req.role;
    const adminId = parseInt(req.params.id as string);
    if (!role) {
      throw new CustomError("admin role not found", 401);
    }

    if (role !== "root_admin") {
      throw new CustomError("unauthorized", 401);
    }

    await store.deleteAdmin(adminId);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status);
    } else {
      res.status(500);
    }

    res.json(error);
  }
}

export async function showAdmins(req: RequestObject, res: Response) {
  try {
    const role = req.role;
    if (!role) {
      throw new CustomError("couldn't verify admin", 401);
    }
    if (role !== "root_admin") {
      throw new CustomError("unauthorized", 401);
    }

    const adminsInfo = await store.getAllAdmins();
    res.status(200);
    res.json(adminsInfo);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status);
    } else {
      res.status(500);
    }
    res.json(error);
  }
}


