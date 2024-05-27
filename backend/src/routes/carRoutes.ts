import { Application } from "express";
import { showCarsToCustomers, searchCars } from "../controllers/carController";
import {
  showAllCountries,
  addCar,
  editCar,
  showAllCars,
  advancedSearchCars,
  checkPlateIdExists,
  checkEditPlateIdExists
} from "../controllers/carController";
import { verifyAdminToken } from "../middlewares/jwtValidation";
import { validateCarInputs} from "../middlewares/inputValidation";
const carRoutes = (app: Application) => {
  app.get("/customer-cars", showCarsToCustomers);
  app.get("/customer-cars/search", searchCars);
  app.get("/cars/countries", showAllCountries);
  app.post("/cars", verifyAdminToken, validateCarInputs, checkPlateIdExists,addCar);
  app.patch("/cars/:id", verifyAdminToken, validateCarInputs, checkEditPlateIdExists,editCar);
  app.get("/cars", verifyAdminToken, showAllCars);
  app.get("/cars/search", verifyAdminToken, advancedSearchCars);
};

export default carRoutes;
