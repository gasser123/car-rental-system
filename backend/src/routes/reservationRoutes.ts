import {
  verifyAdminToken,
  verifyAuthToken,
} from "../middlewares/jwtValidation";
import { Application } from "express";
import { RentCar, passCarCountry } from "../controllers/carController";
import {
  confirmReservation,
  makeAReservation,
  showAllReservations,
  showUnconfirmedReservations,
  showAllAdminReservationsInfo,
  showAdminUnconfirmedReservationsInfo,
  showCustomerReservations
} from "../controllers/reservationController";
import isCustomerVerifiedAuth from "../middlewares/userVerified";
import { validateReservationInputs } from "../middlewares/inputValidation";
import { passPickupLocationCountry } from "../controllers/pickupLocationController";
import { passReturnLocationCountry } from "../controllers/returnLocationController";
import validateCountries from "../middlewares/validateCountries";
import calculateTotalAmount from "../middlewares/calculateTotalAmount";
import { createPaymentIntent } from "../services/stripeServices";
const reservationRoutes = (app: Application) => {
  app.post(
    "/create-payment-intent",
    verifyAuthToken,
    isCustomerVerifiedAuth,
    validateReservationInputs,
    passCarCountry,
    passPickupLocationCountry,
    passReturnLocationCountry,
    validateCountries,
    calculateTotalAmount,
    createPaymentIntent,
    makeAReservation,
    RentCar
  );
  app.get("/reservations", verifyAdminToken, showAllReservations);
  app.get("/customer-reservations", verifyAuthToken, showCustomerReservations);
  app.get(
    "/reservations/unconfirmed",
    verifyAdminToken,
    showUnconfirmedReservations
  );
  app.get("/reservationsinfo", verifyAdminToken, showAllAdminReservationsInfo);
  app.get(
    "/reservationsinfo/unconfirmed",
    verifyAdminToken,
    showAdminUnconfirmedReservationsInfo
  );
  app.patch("/reservations/:id/confirm", verifyAdminToken, confirmReservation);
};

export default reservationRoutes;
