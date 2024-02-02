import { Request, Response } from "express";
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
    const searchValue = req.query.value;
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