import { Application } from "express";
import { passCustomerIdEmail } from "../controllers/customerController"; 
import { changePasswordResetValidate } from "../middlewares/inputValidation"; 
import { changePasswordReset } from "../controllers/customerController";
import { checkResetExists, createReset, searchToken, checkExpired } from "../controllers/passwordResetController";
const passwordResetRoutes = (app: Application) => {
    app.post("/reset", passCustomerIdEmail, checkResetExists, createReset);
    app.patch(
      "/reset/:token",
      searchToken,
      checkExpired,
      changePasswordResetValidate,
      changePasswordReset
    );
  };
  
  export default passwordResetRoutes;