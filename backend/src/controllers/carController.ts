import CarStore from "../models/Car";
import { NextFunction, Request, Response } from "express";
import Car, { status } from "../entities/carEntity";
import CustomError from "../utilities/CustomError";
import RequestObject from "../entities/requestObject";
const store = new CarStore();
export async function showCarsToCustomers(req: Request, res: Response) {
  try {
    const country = req.query.country;
    const availableOnly = req.query.availableOnly;

    if (!country) {
      throw new CustomError("no country chosen", 422);
    }

    let cars: Car[] | null;
    if (availableOnly === "true") {
      cars = await store.getCountryAvailableCars(country as string);
    } else if (availableOnly === "false") {
      cars = await store.searchByCountry(country as string);
    } else {
      throw new CustomError("availability not chosen", 422);
    }

    res.json(cars);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status);
    } else {
      res.status(500);
    }
    res.json(error);
  }
}

export async function showAllCars(req: RequestObject, res: Response) {
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
      throw new CustomError("no country chosen", 422);
    }

    if (!search) {
      throw new CustomError("no search value found", 422);
    }
    if (availableOnly === "true") {
      availability = true;
    } else if (availableOnly === "false") {
      availability = false;
    } else {
      throw new CustomError("availability not chosen", 422);
    }
    const cars = await store.search(
      country as string,
      search as string,
      availability
    );

    res.json(cars);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status);
    } else {
      res.status(400);
    }

    res.json(error);
  }
}

export async function addCar(req: RequestObject, res: Response) {
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
    res.status(500);
    res.json(error);
  }
}

export async function editCar(req: RequestObject, res: Response) {
  try {
    const car: Car = {
      id: parseInt(req.params.id as string),
      color: req.body.color as unknown as string,
      country: req.body.country as unknown as string,
      model: req.body.model as unknown as string,
      image_url: req.body.image_url as unknown as string,
      plate_id: req.body.plate_id as unknown as string,
      price_per_day: req.body.model as unknown as number,
      status: req.body.status as unknown as status,
      year: req.body.year as unknown as string,
    };
    await store.updateCar(car);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
}
export async function showAllCountries(req: Request, res: Response) {
  try {
    const countries = await store.getCountries();
    res.json(countries);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
}

export async function checkIfAvailable(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.query.id as string);
    const check = await store.checkAvailable(id);
    if (!check) {
      throw new CustomError("car is not available", 200);
    }

    next();
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status);
    } else {
      res.status(500);
    }

    res.json(error);
  }
}

export async function RentCar(req: RequestObject, res: Response) {
  try {
    const id = req.car_id;
    if (!id) {
      throw new Error("car id not specified for reservation");
    }
    await store.updateToRented(id);
    res.status(200);
    res.json("Car rented successfully");
  } catch (error) {
    res.status(500);
    res.json(error);
  }
}

export async function advancedSearchCars(req: RequestObject, res: Response) {
  try {
    const search = req.query.search;

    if (!search) {
      throw new CustomError("no search value found", 422);
    }

    const searchValue = search as string;

    const cars = await store.advancedSearch(searchValue);

    res.json(cars);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status);
    } else {
      res.status(400);
    }

    res.json(error);
  }
}
