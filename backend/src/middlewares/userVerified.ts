import { Response, NextFunction } from "express";
import RequestObject from "../entities/requestObject";

function isCustomerVerifiedAuth(req: RequestObject, res: Response, next: NextFunction){
    try {
     const verified = req.verified;
     if(!verified){
      throw new Error();  
     }
     next();
    } catch (error) {
      res.status(401);
      res.json("account is not verified"); 
    }
}

export default isCustomerVerifiedAuth;