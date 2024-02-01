import { Application } from "express";
import {
  searchToken,
  recreateActivation,
  checkExpired,
} from "../controllers/userVerificationController";
import {
  passCustomerEmail,
  checkVerified,
  activateAccount,
} from "../controllers/customerController";
import { verifyAuthToken } from "../middlewares/jwtValidation";
const userVerificationRoutes = (app: Application) => {
  app.get(
    "/activation",
    checkExpired,
    searchToken,
    checkVerified,
    activateAccount
  ); 
  app.patch(
    "/activation",
    verifyAuthToken,
    passCustomerEmail,
    checkVerified,
    recreateActivation
  );
};
export default userVerificationRoutes;
