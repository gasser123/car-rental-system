import express from "express";
import {
  validateCustomerEmail,
  validateCustomerInputs,
  validateLoginInputs,
  changePasswordValidate,
} from "../middlewares/inputValidation";
import { createActivation } from "../controllers/userVerificationController";
import {
  verifyAuthToken,
  verifyAdminToken,
} from "../middlewares/jwtValidation";
import {
  register,
  login,
  logout,
  getProfile,
  changePassword,
  updateProfile,
  showCustomerReservations,
  advancedSearchCustomers,
} from "../controllers/customerController";
const customerRoutes = (app: express.Application) => {
  app.post(
    "/register",
    validateCustomerInputs,
    validateCustomerEmail,
    register,
    createActivation
  );
  app.post("/login", validateLoginInputs, login);
  app.post("/logout", logout);
  app.get("/profile", verifyAuthToken, getProfile);
  app.patch(
    "/changepassword",
    verifyAuthToken,
    changePasswordValidate,
    changePassword
  );
  app.patch(
    "/profile",
    validateCustomerInputs,
    validateCustomerEmail,
    verifyAuthToken,
    updateProfile
  );

  app.get("/history", verifyAuthToken, showCustomerReservations);
  app.get("/customers", verifyAdminToken, advancedSearchCustomers);
};

export default customerRoutes;
