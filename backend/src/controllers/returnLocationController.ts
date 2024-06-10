import { Request, Response, NextFunction } from "express";
import ReturnLocationStore from "../models/ReturnLocation";
import CustomError from "../utilities/CustomError";
import ReturnLocation from "../entities/returnLocationEntity";
import RequestObject from "../entities/requestObject";
const store = new ReturnLocationStore();
export async function getReturnLocations(_req: RequestObject, res: Response) {
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

export async function getReturnLocation(req: RequestObject, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      throw new CustomError("resource not found", 404);
    }
    const location = await store.getReturn(id);
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

export async function addReturnLocation(req: Request, res: Response) {
  try {
    const location: ReturnLocation = {
      country: req.body.country as unknown as string,
      city: req.body.city as unknown as string,
      address: req.body.address as unknown as string,
    };
    await store.createReturnLocation(location);
    res.status(200);
    res.json("new return location added successfully");
  } catch (error) {
    let message = "";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500);
    res.json(message);
  }
}

export async function editReturnLocation(req: Request, res: Response) {
  try {
    const value = req.query.id;
    if (!value) {
      throw new CustomError("id is missing", 422);
    }
    const location: ReturnLocation = {
      id: parseInt(req.query.id as string),
      country: req.body.country as unknown as string,
      city: req.body.city as unknown as string,
      address: req.body.address as unknown as string,
    };
    await store.updateReturnLocation(location);
    res.status(200);
    res.json("return location updated successfully");
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

export async function removeReturnLocation(req: Request, res: Response) {
  try {
    const value = req.query.id;
    if (!value) {
      throw new CustomError("id is missing", 422);
    }
    const id = parseInt(req.query.id as string);
    await store.deleteReturnLocation(id);
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

export async function getCountryReturn(req: Request, res: Response) {
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

export async function searchCountryReturn(req: Request, res: Response) {
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
export async function advancedSearchReturn(req: RequestObject, res: Response) {
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
    const location: ReturnLocation = {
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
    const location: ReturnLocation = {
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

export async function passReturnLocationCountry(
  req: RequestObject,
  res: Response,
  next: NextFunction
) {
  try {
    const value = req.query.return_location_id as string;
    const return_location_id = parseInt(value);
    const country = await store.getLocationCountry(return_location_id);
    req.return_country = country;
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
