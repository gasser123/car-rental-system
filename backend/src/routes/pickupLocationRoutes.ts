import { Application } from "express";
import {
  advancedSearchPickup,
  getCountryPickup,
  searchCountryPickup,
  getPickupLocations,
  addPickupLocation,
  editPickupLocation,
  removePickupLocation,
} from "../controllers/pickupLocationController";
import { verifyAdminToken } from "../middlewares/jwtValidation";
import { validateLocationInputs } from "../middlewares/inputValidation";
const pickupLocationRoutes = (app: Application) => {
  app.get("/pickuplocations", getCountryPickup);
  app.get("/pickuplocations/all", verifyAdminToken, getPickupLocations);
  app.get("/pickuplocations/search", searchCountryPickup);
  app.get(
    "/pickuplocations/advancedsearch",
    verifyAdminToken,
    advancedSearchPickup
  );
  app.post(
    "/pickuplocations",
    verifyAdminToken,
    validateLocationInputs,
    addPickupLocation
  );

  app.patch(
    "/pickuplocations",
    verifyAdminToken,
    validateLocationInputs,
    editPickupLocation
  );
  app.delete("/pickuplocations", verifyAdminToken, removePickupLocation);
};

export default pickupLocationRoutes;
