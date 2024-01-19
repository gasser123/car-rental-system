import { Request, Response } from "express";
import PickupLocationStore from "../models/PickupLocation";
import CustomError from "../utilities/CustomError";
const store = new PickupLocationStore();
export async function getPickupLocations(req: Request, res: Response){
 try {
    const locations = await store.getAll();
    res.status(200);
    res.json(locations);
 } catch (error) {
    res.status(500);
    res.json(error);
 }
}