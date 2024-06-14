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
    let message = "";
    if (error instanceof CustomError) {
      res.status(error.status);
      message = error.message;
    } else if (error instanceof Error) {
      res.status(500);
      message = error.message;
    }

    res.json(message);
  }
}

export async function showAllCars(req: RequestObject, res: Response) {
  try {
    const search = req.query.search;
    let cars: Car[] | null = null;
    if (!search) {
      cars = await store.getAllCars();
    } else {
      cars = await store.advancedSearch(search as string);
    }
    res.json(cars);
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500);
    res.json(message);
  }
}

export async function showCar(req: RequestObject, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const car = await store.getCar(id);
    if (!car) {
      throw new CustomError("resource not found", 404);
    }
    res.json(car);
  } catch (error) {
    let message = "";
    if (error instanceof CustomError) {
      res.status(error.status);
      message = error.message;
    } else if (error instanceof Error) {
      res.status(500);
      message = error.message;
    }
    res.json(message);
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
    let message = "";
    if (error instanceof CustomError) {
      res.status(error.status);
      message = error.message;
    } else if (error instanceof Error) {
      res.status(400);
      message = error.message;
    }

    res.json(message);
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
      price_per_day: req.body.price_per_day as unknown as number,
      status: req.body.status as unknown as status,
      year: req.body.year as unknown as string,
    };
    await store.createCar(car);
    res.status(200);
    res.json("car added successfully");
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500);
    res.json(message);
  }
}

export async function checkPlateIdExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const plate_id = req.body.plate_id as string;
    const check = await store.plateIdExists(plate_id);
    if (check) {
      throw new CustomError("plate id is already used", 200);
    }
    next();
  } catch (error) {
    let message = "";
    if (error instanceof CustomError) {
      res.status(error.status);
      message = error.message;
    } else if (error instanceof Error) {
      res.status(400);
      message = error.message;
    }

    res.json(message);
  }
}

export async function checkEditPlateIdExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const value = req.params.id;
    if (!value) {
      throw new CustomError("id not found", 422);
    }
    const id = parseInt(value);
    const plate_id = req.body.plate_id as string;
    const check = await store.editPlateIdExists(plate_id, id);
    if (check) {
      throw new CustomError("plate id is already used", 200);
    }
    next();
  } catch (error) {
    let message = "";
    if (error instanceof CustomError) {
      res.status(error.status);
      message = error.message;
    } else if (error instanceof Error) {
      res.status(400);
      message = error.message;
    }

    res.json(message);
  }
}

export async function editCar(req: RequestObject, res: Response) {
  try {
    const value = req.params.id;
    if (!value) {
      throw new CustomError("id not found", 422);
    }
    const car: Car = {
      id: parseInt(req.params.id as string),
      color: req.body.color as unknown as string,
      country: req.body.country as unknown as string,
      model: req.body.model as unknown as string,
      image_url: req.body.image_url as unknown as string,
      plate_id: req.body.plate_id as unknown as string,
      price_per_day: req.body.price_per_day as unknown as number,
      status: req.body.status as unknown as status,
      year: req.body.year as unknown as string,
    };
    await store.updateCar(car);
    res.json("car updated successfully");
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500);
    res.json(message);
  }
}
export async function showAllCountries(req: Request, res: Response) {
  try {
    const countries = await store.getCountries();
    res.json(countries);
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500);
    res.json(message);
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
    let message = "";
    if (error instanceof CustomError) {
      res.status(error.status);
      message = error.message;
    } else if (error instanceof Error) {
      res.status(500);
      message = error.message;
    }

    res.json(message);
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
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500);
    res.json(message);
  }
}

export async function passCarCountry(
  req: RequestObject,
  res: Response,
  next: NextFunction
) {
  try {
    const value = req.body.car_id;
    const car_id = value as number;
    const country = await store.getCarCountry(car_id);
    req.car_country = country;
    next();
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      res.status(500);
      message = error.message;
    }
    res.json(message);
  }
}
