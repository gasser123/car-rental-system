import Stripe from "stripe";
import dotenv from "dotenv";
import { Response, NextFunction } from "express";
import RequestObject from "../entities/requestObject";
import CustomError from "../utilities/CustomError";
dotenv.config();
const { STRIPE_SECRET } = process.env;
// Initialize the Stripe client with your secret key
const stripe = STRIPE_SECRET ? new Stripe(STRIPE_SECRET) : null;

export async function createPaymentIntent(
  req: RequestObject,
  res: Response,
  next: NextFunction
) {
  try {
    if (!stripe) {
      throw new Error("Payment failed. Problem with server");
    }
    const totalAmount = req.total_amount;
    if (!totalAmount) {
      throw new Error("Payment failed. Problem with server");
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      // multiply by 100 because the amount takes the subunit for currency
      // in this case 1 dollar = 100 cents for usd currency
      amount: totalAmount * 100,
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional
      //because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.json({
      clientSecret: paymentIntent.client_secret,
    });

    // After the payment intent is confirmed, add the reservation to the database
    // in production you should use stripe web hook to get a POST  request from stripe
    // for payment intent event to check whether it failed or succeeded
    // that would be in another route endpoint in case it succeeded add the reservation
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
