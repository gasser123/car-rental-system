import { Application } from "express";
import {
  getCountryReturn,
  searchCountryReturn,
} from "../controllers/returnLocationController";
const returnLocationRoutes = (app: Application) => {
  app.get("/returnlocations", getCountryReturn);
  app.get("/returnlocations/search", searchCountryReturn);
};

export default returnLocationRoutes;
