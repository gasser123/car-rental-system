import { Application } from "express";
import {
  getCountryReturn,
  searchCountryReturn,
  getReturnLocations,
  advancedSearchReturn,
  addReturnLocation,
  editReturnLocation,
  removeReturnLocation,
  checkLocationAlreadyExists,
  checkEditLocationAlreadyExists,
  getReturnLocation,
  showLocationID
} from "../controllers/returnLocationController";
import { verifyAdminToken } from "../middlewares/jwtValidation";
import { validateLocationInputs } from "../middlewares/inputValidation";
const returnLocationRoutes = (app: Application) => {
  app.get("/returnlocations", getCountryReturn);
  app.get("/returnlocations/all", verifyAdminToken, getReturnLocations);
  app.get("/returnlocations/:id", verifyAdminToken, getReturnLocation);
  app.get("/returnlocations/search", searchCountryReturn);
  app.get(
    "/returnlocations-search",
    verifyAdminToken,
    advancedSearchReturn
  );
  app.get("/returnlocation-id", showLocationID);
  app.post(
    "/returnlocations",
    verifyAdminToken,
    validateLocationInputs,
    checkLocationAlreadyExists,
    addReturnLocation
  );

  app.patch(
    "/returnlocations",
    verifyAdminToken,
    validateLocationInputs,
    checkEditLocationAlreadyExists,
    editReturnLocation
  );
  app.delete("/returnlocations", verifyAdminToken, removeReturnLocation);
};

export default returnLocationRoutes;
