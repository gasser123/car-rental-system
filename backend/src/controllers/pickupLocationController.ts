import { NextFunction, Request, Response } from "express";
import PickupLocationStore from "../models/PickupLocation";
import CustomError from "../utilities/CustomError";
import PickupLocation from "../entities/pickupLocationEntity";
import RequestObject from "../entities/requestObject";
const store = new PickupLocationStore();
export async function getPickupLocations(_req: RequestObject, res: Response) {
  try {
    const locations = await store.getAll();
    res.status(200);
    res.json(locations);
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500);
    res.json(message);
  }
}
export async function getPickupLocation(req: RequestObject, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      throw new CustomError("resource not found", 404);
    }
    const location = await store.getPickup(id);
    if (!location) {
      throw new CustomError("resource not found", 404);
    }
    res.status(200);
    res.json(location);
  } catch (error) {
    let message = "";
    if (error instanceof CustomError) {
      res.status(error.status);
      message = error.message;
    } else if (error instanceof Error) {
      message = error.message;
      res.status(500);
    }

    res.json(message);
  }
}

export async function addPickupLocation(req: RequestObject, res: Response) {
  try {
    const location: PickupLocation = {
      country: req.body.country as unknown as string,
      city: req.body.city as unknown as string,
      address: req.body.address as unknown as string,
    };
    await store.createPickupLocation(location);
    res.status(200);
    res.json("new pickup location added successfully");
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500);
    res.json(message);
  }
}

export async function editPickupLocation(req: Request, res: Response) {
  try {
    const value = req.query.id;
    if (!value) {
      throw new CustomError("pickup location id is missing", 422);
    }
    const location: PickupLocation = {
      id: parseInt(req.query.id as string),
      country: req.body.country as unknown as string,
      city: req.body.city as unknown as string,
      address: req.body.address as unknown as string,
    };
    await store.updatePickupLocation(location);
    res.status(200);
    res.json("new pickup location added successfully");
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

export async function removePickupLocation(req: Request, res: Response) {
  try {
    const value = req.query.id;
    if (!value) {
      throw new CustomError("id is missing", 422);
    }
    const id = parseInt(req.query.id as string);
    await store.deletePickupLocation(id);
    res.status(200).json("deleted location successfully");
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

export async function getCountryPickup(req: Request, res: Response) {
  try {
    const value = req.query.country;
    if (!value) {
      throw new CustomError("invalid country input", 422);
    }
    const country = value as string;
    const locations = await store.getByCountry(country);
    res.json(locations);
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

export async function searchCountryPickup(req: Request, res: Response) {
  try {
    const countryValue = req.query.country;
    const searchValue = req.query.value;
    if (!countryValue) {
      throw new CustomError("invalid country input", 422);
    }
    if (!searchValue) {
      throw new CustomError("invalid search input", 422);
    }
    const country = countryValue as string;
    const search = searchValue as string;
    const locations = await store.searchByCountry(country, search);
    res.json(locations);
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
export async function advancedSearchPickup(req: RequestObject, res: Response) {
  try {
    const searchValue = req.query.search;
    if (!searchValue) {
      throw new CustomError("invalid search input", 422);
    }
    const search = searchValue as string;
    const locations = await store.advancedSearch(search);
    res.json(locations);
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

export async function checkLocationAlreadyExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const location: PickupLocation = {
      country: req.body.country as string,
      city: req.body.city as string,
      address: req.body.address as string,
    };
    const check = await store.locationAlreadyExists(location);
    if (check) {
      throw new CustomError("location already exists", 200);
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

export async function checkEditLocationAlreadyExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const value = req.query.id;
    if (!value) {
      throw new CustomError("pickup location id is missing", 422);
    }
    const location: PickupLocation = {
      id: parseInt(value as string),
      country: req.body.country as string,
      city: req.body.city as string,
      address: req.body.address as string,
    };
    const check = await store.editLocationAlreadyExists(location);
    if (check) {
      throw new CustomError("location already exists", 200);
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

export async function showLocationID(req: Request, res: Response) {
  try {
    const country = req.query.country;
    const city = req.query.city;
    const address = req.query.address;
    if (!country) {
      throw new CustomError("country is missing", 422);
    }
    if (!city) {
      throw new CustomError("city is missing", 422);
    }
    if (!address) {
      throw new CustomError("address is missing", 422);
    }
    const location: PickupLocation = {
      country: country as string,
      city: city as string,
      address: address as string,
    };
    const id = await store.getLocationID(location);
    if (!id) {
      throw new CustomError("resource not found", 404);
    }
    location.id = id;
    res.json(location);
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

export async function passPickupLocationCountry(
  req: RequestObject,
  res: Response,
  next: NextFunction
) {
  try {
    const value = req.query.pickup_location_id as string;
    const pickup_location_id = parseInt(value);
    const country = await store.getLocationCountry(pickup_location_id);
    req.pickup_country = country;
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
