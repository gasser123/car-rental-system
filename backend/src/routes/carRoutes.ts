import { Application } from "express";
import { showCarsToCustomers, searchCars } from "../controllers/carController";
import {
  showAllCountries,
  addCar,
  editCar,
  showAllCars,
  advancedSearchCars,
} from "../controllers/carController";
import { verifyAdminToken } from "../middlewares/jwtValidation";
import { validateCarInputs } from "../middlewares/inputValidation";
const carRoutes = (app: Application) => {
  app.get("/cars", showCarsToCustomers);
  app.get("/cars/search", searchCars);
  app.get("/cars/countries", showAllCountries);
  app.post("/cars", verifyAdminToken, validateCarInputs, addCar);
  app.patch("/cars/:id", verifyAdminToken, validateCarInputs, editCar);
  app.get("/admincars", verifyAdminToken, showAllCars);
  app.get("/admincars/search", verifyAdminToken, advancedSearchCars);
};

export default carRoutes;
