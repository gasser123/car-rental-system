import { Application } from "express";
import {
  getCountryReturn,
  searchCountryReturn,
  getReturnLocations,
  advancedSearchReturn
} from "../controllers/returnLocationController";
import { verifyAdminToken } from "../middlewares/jwtValidation";
const returnLocationRoutes = (app: Application) => {
  app.get("/returnlocations", getCountryReturn);
  app.get("/pickuplocations/all", verifyAdminToken, getReturnLocations);
  app.get("/returnlocations/search", searchCountryReturn);
  app.get(
    "/pickuplocations/advancedsearch",
    verifyAdminToken,
    advancedSearchReturn
  );
};

export default returnLocationRoutes;
