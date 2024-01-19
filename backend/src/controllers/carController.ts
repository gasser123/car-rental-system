import CarStore from "../models/Car";
import { Request, Response } from "express";
import Car, { status } from "../entities/carEntity";
const store = new CarStore();
export async function showCars(req: Request, res: Response) {
  try {
    const country = req.query.country;
    const availableOnly = req.query.availableOnly;

    if (!country) {
      throw new Error("no country chosen");
    }

    let cars: Car[] | null;
    if (availableOnly === "true") {
      cars = await store.getCountryAvailableCars(country as string);
    } else if (availableOnly === "false") {
      cars = await store.searchByCountry(country as string);
    } else {
      throw new Error("availability not chosen");
    }

    res.json(cars);
  } catch (error) {
    res.json(error);
  }
}

export async function showAllCars(req: Request, res: Response) {
  try {
    const cars = await store.getAllCars();
    res.json(cars);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
}

export async function searchCars(req: Request, res: Response) {
  try {
    const country = req.query.country;
    const search = req.query.search;
    const availableOnly = req.query.availableOnly;
    let availability: boolean;
    if (!country) {
      throw new Error("no country chosen");
    }

    if (!search) {
      throw new Error("no search value found");
    }
    if (availableOnly === "true") {
      availability = true;
    } else if (availableOnly === "false") {
      availability = false;
    } else {
      throw new Error("availability not chosen");
    }
    const cars = await store.search(
      country as string,
      search as string,
      availability
    );

    res.json(cars);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
}

export async function addCar(req: Request, res: Response) {
  try {
    const car: Car = {
      color: req.body.color as unknown as string,
      country: req.body.country as unknown as string,
      model: req.body.model as unknown as string,
      image_url: req.body.image_url as unknown as string,
      plate_id: req.body.plate_id as unknown as string,
      price_per_day: req.body.model as unknown as number,
      status: req.body.status as unknown as status,
      year: req.body.year as unknown as string,
    };
    await store.createCar(car);
  } catch (error) {
    res.json(error);
  }
}
