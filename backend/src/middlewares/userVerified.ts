import { Response, NextFunction } from "express";
import RequestObject from "../entities/requestObject";

function isCustomerVerifiedAuth(
  req: RequestObject,
  res: Response,
  next: NextFunction
) {
  try {
    const verified = req.verified;
    if (!verified) {
      throw new Error();
    }
    next();
  } catch (error) {
    res.status(401);
    res.json("account is not verified");
  }
}

export function isCustomerVerifiedCheck(req: RequestObject, res: Response) {
  try {
    const verified = req.verified;
    res.status(200);
    res.json({ verified: verified });
  } catch (error) {
    res.status(500);
    res.json("error checking account activation");
  }
}

export default isCustomerVerifiedAuth;
