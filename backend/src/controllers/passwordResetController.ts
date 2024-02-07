import { Request, Response, NextFunction} from "express";
import PasswordResetStore from "../models/PasswordReset";
import RequestObject from "../entities/requestObject";
import sendMail from "../utilities/mail";
import CustomError from "../utilities/CustomError";
const store = new PasswordResetStore();
export async function createReset(req: RequestObject, res: Response) {
  try {
    const email = req.user_email;
    const customer_id = req.user_id;
    const reset_exists = req.reset_exists;
    if (!customer_id) {
      throw new Error("user credential is missing");
    }
    if (!email) {
      throw new Error("email is not specified");
    }
    let activationURL: string;
    if (reset_exists === true) {
      activationURL = await store.updatePasswordReset(customer_id);
    } else if (reset_exists === false) {
      activationURL = await store.createPasswordReset(customer_id);
    } else {
      throw new Error("error checking user reset");
    }

    const html = `<div>
    <h3>Welcome ${email}</h3>
    <p>
    If you forgot your password you can reset it by clicking the button below the link expires in one hour.</p>
       </div>
      <div> 
       <button style="border-radius: 25px;
       padding: 10px 25px; background-color: blue;"><a href=${activationURL} target="_blank" style="color: white;  text-decoration: none;">Reset password</a></button>
      </div>

      `;

    res.on("finish", async () => {
      try {
        await sendMail(email, "Account activation", html);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    });
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
    const value = req.params.token;
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
    const value = req.params.token;
    if (!value) {
      throw new CustomError("invalid token", 422);
    }
    const token = value as string;
    const isExpired = await store.isExpired(token);
    if (isExpired) {
      res.status(410);
      res.json("link expired");
    } else {
      next();
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
}

export async function checkResetExists(
  req: RequestObject,
  res: Response,
  next: NextFunction
) {
  try {
    const customer_id = req.user_id;
    if (!customer_id) {
      throw new Error("user credential is missing");
    }
    const check = await store.resetExists(customer_id);
    req.reset_exists = check;
    next();
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      res.status(500);
      message = error.message;
    }
    res.json(message);
  }
}


