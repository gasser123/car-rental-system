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
import { createActivation, eidtEmailRecreateActivation } from "../controllers/userVerificationController";
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
  showCustomers,
  checkConfirmCurrentPassword,
  editEmail,
  unVerifyAccount
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
    "/changepassword",
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
    editEmail,
    unVerifyAccount,
    eidtEmailRecreateActivation
  );

  app.get("/history", verifyAuthToken, showCustomerReservations);
  app.get("/customers", verifyAdminToken, showCustomers);
  app.get("/logged", verifyCustomerLoggedIn);
};

export default customerRoutes;
