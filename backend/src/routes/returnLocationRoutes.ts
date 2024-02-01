import { Application } from "express";
import {
  getCountryReturn,
  searchCountryReturn,
  getReturnLocations,
  advancedSearchReturn,
  addReturnLocation,
  editReturnLocation,
  removeReturnLocation,
} from "../controllers/returnLocationController";
import { verifyAdminToken } from "../middlewares/jwtValidation";
import { validateLocationInputs } from "../middlewares/inputValidation";
const returnLocationRoutes = (app: Application) => {
  app.get("/returnlocations", getCountryReturn);
  app.get("/returnlocations/all", verifyAdminToken, getReturnLocations);
  app.get("/returnlocations/search", searchCountryReturn);
  app.get(
    "/returnlocations/advancedsearch",
    verifyAdminToken,
    advancedSearchReturn
  );
  app.post(
    "/returnlocations",
    verifyAdminToken,
    validateLocationInputs,
    addReturnLocation
  );

  app.patch(
    "/returnlocations",
    verifyAdminToken,
    validateLocationInputs,
    editReturnLocation
  );
  app.delete("/returnlocations", verifyAdminToken, removeReturnLocation);
};

export default returnLocationRoutes;
