import { Application } from "express";
import {
  getCountryPickup,
  searchCountryPickup,
} from "../controllers/pickupLocationController";
const pickupLocationRoutes = (app: Application) => {
  app.get("/pickuplocations", getCountryPickup);
  app.get("/pickuplocations/search", searchCountryPickup);
};

export default pickupLocationRoutes;
