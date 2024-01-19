import express from "express";
import {
  validateCustomerEmail,
  validateCustomerInputs,
} from "../middlewares/inputValidation";
import verifyAuthToken from "../middlewares/jwtValidation";
import {
  register,
  login,
  logout,
  getProfile,
  changePassword,
  updateProfile,
} from "../controllers/customerController";
const customerRoutes = (app: express.Application) => {
  app.post(
    "/register",
    validateCustomerInputs,
    validateCustomerEmail,
    register
  );
  app.post("/login", login);
  app.post("/logout", logout);
  app.get("/profile", verifyAuthToken, getProfile);
  app.patch("/changepassword", verifyAuthToken, changePassword);
  app.patch(
    "/updateprofile",
    validateCustomerInputs,
    validateCustomerEmail,
    verifyAuthToken,
    updateProfile
  );
};

export default customerRoutes;
