import RequestObject from "../entities/requestObject";
import { Response, NextFunction } from "express";
import CustomError from "../utilities/CustomError";
function isRootAdmin(req: RequestObject, res: Response, next: NextFunction) {
  try {
    const admin_role = req.role;
    if (!admin_role) {
      throw new CustomError("admin is not authenticated", 401);
    }
    if (admin_role !== "root_admin") {
      throw new CustomError("unauthorized", 403);
    }
    next();
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

export default isRootAdmin;
