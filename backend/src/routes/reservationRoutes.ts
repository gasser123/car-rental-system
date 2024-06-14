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
const reservationRoutes = (app: Application) => {
  app.post(
    "/reservations",
    verifyAuthToken,
    isCustomerVerifiedAuth,
    validateReservationInputs,
    passCarCountry,
    passPickupLocationCountry,
    passReturnLocationCountry,
    validateCountries,
    //TODO: add a middleware to calculate total amount
    // and pass it in request
    //TODO: put makeAreservation and Rent Car in a separate endpoint (stripe web hook to get metadata from payment intent)
    // and replace them with the payment Intent instead
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
  app.patch("/reservations/confirm/:id", verifyAdminToken, confirmReservation);
};

export default reservationRoutes;
