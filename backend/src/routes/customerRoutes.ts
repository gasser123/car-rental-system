import express from "express";
import {
  validateCustomerEmail,
  validateCustomerInputs,
  validateLoginInputs
} from "../middlewares/inputValidation";
import {verifyAuthToken} from "../middlewares/jwtValidation";
import {
  register,
  login,
  logout,
  getProfile,
  changePassword,
  updateProfile,
  showCustomerReservations
} from "../controllers/customerController";
const customerRoutes = (app: express.Application) => {
  app.post(
    "/register",
    validateCustomerInputs,
    validateCustomerEmail,
    register
  );
  app.post("/login", validateLoginInputs, login);
  app.post("/logout", logout);
  app.get("/profile", verifyAuthToken, getProfile);
  app.patch("/changepassword", verifyAuthToken, changePassword);
  app.patch(
    "/profile",
    validateCustomerInputs,
    validateCustomerEmail,
    verifyAuthToken,
    updateProfile
  );

  app.get("/history", verifyAuthToken, showCustomerReservations);
};

export default customerRoutes;
