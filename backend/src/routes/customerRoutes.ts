import express from "express";
import {
  validateCustomerEmail,
  validateCustomerInputs,
  validateLoginInputs,
  changePasswordValidate,
  checkLicenseAlreadyExists,
  validateEditCustomerInputs,
  checkEditLicenseAlreadyExists,
  validateEditCustomerEmail,
} from "../middlewares/inputValidation";
import { createActivation } from "../controllers/userVerificationController";
import {
  verifyAuthToken,
  verifyAdminToken,
  verifyCustomerLoggedIn,
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
  checkConfirmCurrentPassword,
  editEmail,
} from "../controllers/customerController";
const customerRoutes = (app: express.Application) => {
  app.post(
    "/register",
    validateCustomerInputs,
    validateCustomerEmail,
    checkLicenseAlreadyExists,
    register,
    createActivation
  );
  app.post("/login", validateLoginInputs, login);
  app.post("/logout", logout);
  app.get("/profile", verifyAuthToken, getProfile);
  app.patch(
    "/editpassword",
    verifyAuthToken,
    changePasswordValidate,
    changePassword
  );
  app.patch(
    "/profile",
    verifyAuthToken,
    validateEditCustomerInputs,
    checkEditLicenseAlreadyExists,
    updateProfile
  );
  app.patch(
    "/editemail",
    verifyAuthToken,
    checkConfirmCurrentPassword,
    validateEditCustomerEmail,
    editEmail
  );

  app.get("/history", verifyAuthToken, showCustomerReservations);
  app.get("/customers", verifyAdminToken, advancedSearchCustomers);
  app.get("/logged", verifyCustomerLoggedIn);
};

export default customerRoutes;
