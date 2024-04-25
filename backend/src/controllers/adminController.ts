import { Request, Response } from "express";
import AdminStore, { AdminInfo } from "../models/Admin";
import Admin from "../entities/adminEntity";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import RequestObject from "../entities/requestObject";
import CustomError from "../utilities/CustomError";
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
    let message = "";
    if (err instanceof Error) {
      message = err.message;
    }
    res.status(500);
    res.json(message);
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
      res.cookie("logged", "admin", {
        expires: new Date(Date.now() + expiration_time), // time until expiration
        secure: false, // set to true if you're using https
        httpOnly: false,
      });

      res.status(200).json("logged in successfully");
    } else {
      res.status(200);
      res.json("invalid email or password");
    }
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500);
    res.json(message);
  }
}

export function logout(req: Request, res: Response) {
  res.clearCookie("token", {
    secure: false,
    httpOnly: true,
  });
  res.clearCookie("logged", {
    secure: false,
    httpOnly: false,
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
    res.clearCookie("logged", {
      secure: false,
      httpOnly: false,
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
    };

    await store.updateAdminInfo(adminInfo);
    res.status(200);
    res.json("profile updated successfully");
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

export const changePassword = async (req: RequestObject, res: Response) => {
  try {
    const admin_id = req.user_id;
    const { currentPassword, newPassword } = req.body;

    if (!admin_id) {
      throw new CustomError("couldn't verify user", 401);
    }
    const check = await store.confirmCurrentPassword(
      admin_id,
      currentPassword as unknown as string
    );
    if (check) {
      await store.updateAdminPassword(
        admin_id,
        newPassword as unknown as string
      );
      res.status(200);
      res.clearCookie("token", {
        secure: false,
        httpOnly: true,
      });
      res.clearCookie("logged", {
        secure: false,
        httpOnly: false,
      });
      res.json("password changed successfully you need to login again");
    } else {
      throw new CustomError("wrong current password", 200);
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

export async function removeAdmin(req: RequestObject, res: Response) {
  try {
    const role = req.role;
    const adminId = parseInt(req.params.id as string);
    if (!role) {
      throw new CustomError("admin role not found", 401);
    }

    if (role !== "root_admin") {
      throw new CustomError("unauthorized", 403);
    }

    await store.deleteAdmin(adminId);
    res.status(200);
    res.json("deleted successfully");
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

export async function showAdmins(req: RequestObject, res: Response) {
  try {
    const role = req.role;
    if (!role) {
      throw new CustomError("couldn't verify admin", 401);
    }
    if (role !== "root_admin") {
      throw new CustomError("unauthorized", 403);
    }

    const adminsInfo = await store.getAllAdmins();
    res.status(200);
    res.json(adminsInfo);
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
