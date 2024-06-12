import { Application } from "express";
import {
  advancedSearchPickup,
  getCountryPickup,
  searchCountryPickup,
  getPickupLocations,
  addPickupLocation,
  editPickupLocation,
  removePickupLocation,
  checkLocationAlreadyExists,
  checkEditLocationAlreadyExists,
  getPickupLocation,
  showLocationID
} from "../controllers/pickupLocationController";
import { verifyAdminToken } from "../middlewares/jwtValidation";
import { validateLocationInputs } from "../middlewares/inputValidation";
const pickupLocationRoutes = (app: Application) => {
  app.get("/pickuplocations", getCountryPickup);
  app.get("/pickuplocations/all", verifyAdminToken, getPickupLocations);
  app.get("/pickuplocations/:id", verifyAdminToken, getPickupLocation);
  app.get("/pickuplocations/search", searchCountryPickup);
  app.get(
    "/pickuplocations-search",
    verifyAdminToken,
    advancedSearchPickup
  );
  app.get("/pickuplocation-id", showLocationID);
  app.post(
    "/pickuplocations",
    verifyAdminToken,
    validateLocationInputs,
    checkLocationAlreadyExists,
    addPickupLocation
  );

  app.patch(
    "/pickuplocations",
    verifyAdminToken,
    validateLocationInputs,
    checkEditLocationAlreadyExists,
    editPickupLocation
  );
  app.delete("/pickuplocations", verifyAdminToken, removePickupLocation);
};

export default pickupLocationRoutes;
