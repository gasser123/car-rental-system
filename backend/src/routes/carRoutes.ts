import { Application } from "express";
import { showCars, searchCars } from "../controllers/carController";
import { showAllCountries } from "../controllers/carController";
const carRoutes = (app: Application) => {
  app.get("/cars", showCars);
  app.get("/cars/search", searchCars);
  app.get("/cars/countries", showAllCountries);
};

export default carRoutes;
