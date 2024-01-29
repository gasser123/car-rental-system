import { Application } from "express";
import {
  advancedSearchPickup,
  getCountryPickup,
  searchCountryPickup,
  getPickupLocations,
} from "../controllers/pickupLocationController";
import { verifyAdminToken } from "../middlewares/jwtValidation";
const pickupLocationRoutes = (app: Application) => {
  app.get("/pickuplocations", getCountryPickup);
  app.get("/pickuplocations/all", verifyAdminToken, getPickupLocations);
  app.get("/pickuplocations/search", searchCountryPickup);
  app.get(
    "/pickuplocations/advancedsearch",
    verifyAdminToken,
    advancedSearchPickup
  );
};

export default pickupLocationRoutes;
