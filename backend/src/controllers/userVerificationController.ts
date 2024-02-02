import { Request, Response, NextFunction } from "express";
import UserVerificationStore from "../models/UserVerification";
import RequestObject from "../entities/requestObject";
import sendMail from "../utilities/mail";
import CustomError from "../utilities/CustomError";
const store = new UserVerificationStore();
export async function createActivation(req: RequestObject, res: Response) {
  try {
    const customer_id = req.user_id;
    const email = req.user_email;
    if (!customer_id) {
      throw new Error("user identifier is not specified for activation");
    }
    const activationURL = await store.createUserVerification(customer_id);
    const html = `<div>
             <p>Click the link below to activate your account</p>
                </div>
               <div> 
                <a href=${activationURL} target="_blank"> activate my account</a>
               </div>
    
               `;
    if (!email) {
      throw new Error("user email is missing");
    }
    sendMail(email, "Account activation", html);
    res.status(200);
    res.json("email is being sent");
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500);
    res.json(message);
  }
}

export async function recreateActivation(req: RequestObject, res: Response) {
  try {
    const customer_id = req.user_id;
    const email = req.user_email;
    if (!customer_id) {
      throw new Error("user identifier is not specified for activation");
    }
    const activationURL = await store.updateUserVerification(customer_id);
    const html = `<div>
                 <p>Click the link below to activate your account the link expires in six hours.</p>
                    </div>
                   <div> 
                    <a href=${activationURL} target="_blank"> activate my account</a>
                   </div>
        
                   `;

    if (!email) {
      throw new Error("user email is missing");
    }
    sendMail(email, "Account activation", html);
    res.status(200);
    res.json("email is being sent");
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500);
    res.json(message);
  }
}

export async function searchToken(
  req: RequestObject,
  res: Response,
  next: NextFunction
) {
  try {
    const value = req.query.token;
    if (!value) {
      throw new CustomError("invalid token", 422);
    }

    const token = value as string;
    const customer_id = await store.findToken(token);
    if (!customer_id) {
      throw new CustomError("page not found", 404);
    }
    req.user_id = customer_id;
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

export async function checkExpired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const value = req.query.token;
    if (!value) {
      throw new CustomError("invalid token", 422);
    }
    const token = value as string;
    const isExpired = await store.isExpired(token);
    if (isExpired) {
      res.status(410);
      res.json("link expired");
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
