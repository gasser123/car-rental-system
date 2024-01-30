import { Application } from "express";
import {
  searchToken,
  recreateActivation,
} from "../controllers/userVerificationController";
import {
  passCustomerEmail,
  checkVerified,
  activateAccount
} from "../controllers/customerController";
import { verifyAuthToken } from "../middlewares/jwtValidation";
const userVerificationRoutes = (app: Application) => {
  app.get("/activation",checkVerified, searchToken, activateAccount); //TODO
  app.patch(
    "/activation",
    verifyAuthToken,
    passCustomerEmail,
    checkVerified,
    recreateActivation
  );
};
export default userVerificationRoutes;
