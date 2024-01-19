import { Application } from "express";
import { showCars, searchCars} from "../controllers/carController";
const carRoutes = (app: Application) => {
    app.get("/cars", showCars);
    app.get("/cars/search", searchCars);
  };
  
  export default carRoutes;