import Car from "../entities/carEntity";
import DB from "../database";
class CarStore {
  async createCar(car: Car): Promise<void> {
    try {
      const {
        plate_id,
        model,
        year,
        status,
        price_per_day,
        country,
        color,
        image_url,
      } = car;
      const sql =
        "INSERT INTO car(plate_id, model, year, status, price_per_day, country, color, image_url) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
      await DB.execute(sql, [
        plate_id,
        model,
        year,
        status,
        price_per_day,
        country,
        color,
        image_url,
      ]);
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't create car`);
    }
  }

  async getAllCars(): Promise<Car[] | null> {
    try {
      const sql = "SELECT * FROM car";
      const [rows] = await DB.execute(sql);
      const result = rows as unknown as Car[];
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't get all cars`);
    }
  }

  async getCar(id: number): Promise<Car | null> {
    try {
      const sql = "SELECT * FROM car WHERE id = ?";
      const [rows] = await DB.execute(sql, [id]);
      const result = rows as unknown as Car[];
      if (result.length === 0) {
        return null;
      }
      return result[0];
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't get car info`);
    }
  }

  async updateCar(car: Car): Promise<void> {
    try {
      const {
        plate_id,
        model,
        year,
        status,
        price_per_day,
        country,
        color,
        id,
        image_url,
      } = car;
      const sql =
        "UPDATE car SET plate_id = ?, model = ?, year = ?, status = ?, price_per_day = ?, country = ?, color = ?, image_url = ? WHERE id = ?";
      await DB.execute(sql, [
        plate_id,
        model,
        year,
        status,
        price_per_day,
        country,
        color,
        image_url,
        id,
      ]);
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't update car`);
    }
  }

  async searchByCountry(country: string): Promise<Car[] | null> {
    try {
      const sql = "SELECT * FROM car WHERE country = ?";
      const [rows] = await DB.execute(sql, [country]);
      const result = rows as unknown as Car[];
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't search by country`);
    }
  }

  async getCountryAvailableCars(country: string): Promise<Car[] | null> {
    try {
      const sql =
        "SELECT * FROM car WHERE country = ? AND status = 'Available'";
      const [rows] = await DB.execute(sql, [country]);
      const result = rows as unknown as Car[];
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't get country available cars`);
    }
  }
  async getCountries(): Promise<{ country: string }[] | null> {
    try {
      const sql = "SELECT DISTINCT country FROM car";
      const [rows] = await DB.execute(sql);
      const result = rows as unknown as { country: string }[];
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't get countries`);
    }
  }

  async search(
    country: string,
    value: string,
    availableOnly: boolean
  ): Promise<Car[] | null> {
    const numberValue = parseFloat(value);
    const valueSearch = `%${value}%`;
    try {
      let sql: string;
      let result: Car[];
      if (availableOnly === true) {
        sql =
          "SELECT * FROM car WHERE model LIKE ? OR year LIKE ? OR price_per_day = ? OR color LIKE ? AND country = ? AND status = 'Available'";
        const [rows] = await DB.execute(sql, [
          valueSearch,
          valueSearch,
          numberValue,
          valueSearch,
          country,
        ]);
        result = rows as unknown as Car[];
      } else {
        sql =
          "SELECT * FROM car WHERE model LIKE ? OR year LIKE ? OR status LIKE ? OR price_per_day = ? OR color LIKE ? AND country = ?";
        const [rows] = await DB.execute(sql, [
          valueSearch,
          valueSearch,
          valueSearch,
          numberValue,
          valueSearch,
          country,
        ]);
        result = rows as unknown as Car[];
      }

      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't do a search`);
    }
  }

  async advancedSearch(value: string): Promise<Car[] | null> {
    const idValue = parseInt(value);
    const numberValue = parseFloat(value);
    const valueSearch = `%${value}%`;
    try {
      const sql =
        "SELECT * FROM car WHERE id = ? OR plate_id LIKE ? OR model LIKE ? OR year LIKE ? OR status LIKE ? OR price_per_day = ? OR color LIKE ? OR country LIKE ?";
      const [rows] = await DB.execute(sql, [
        idValue,
        valueSearch,
        valueSearch,
        valueSearch,
        valueSearch,
        numberValue,
        valueSearch,
        valueSearch,
      ]);
      const result = rows as unknown as Car[];
      if (result.length === 0) {
        return null;
      }

      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't do an advanced search`);
    }
  }

  async checkAvailable(id: number): Promise<boolean> {
    try {
      const sql = "SELECT status FROM car WHERE id = ?";
      const [rows] = await DB.execute(sql, [id]);
      const result = rows as unknown as Car[];
      if (result.length === 0) {
        return false;
      }
      const car = result[0];
      if (car.status === "Available") {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't check if car is available`);
    }
  }

  async updateToRented(id: number): Promise<void> {
    try {
      const sql = "UPDATE car SET status = 'Rented' WHERE id = ?";
      await DB.execute(sql, [id]);
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't update car to rented`);
    }
  }

  async plateIdExists(plate_id: string): Promise<boolean> {
    try {
      const sql = "SELECT * FROM car WHERE plate_id = ?";
      const [rows] = await DB.execute(sql, [plate_id]);
      const result = rows as Car[];
      if (result.length === 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("couldn't check if plate_id exists");
    }
  }

  async editPlateIdExists(plate_id: string, id: number): Promise<boolean> {
    try {
      const sql = "SELECT * FROM car WHERE plate_id = ? AND id != ?";
      const [rows] = await DB.execute(sql, [plate_id, id]);
      const result = rows as Car[];
      if (result.length === 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("couldn't check if plate_id exists");
    }
  }
  async getCarCountry(id: number): Promise<string> {
    try {
      const sql = "SELECT * FROM car WHERE id = ?";
      const [rows] = await DB.execute(sql, [id]);
      const result = rows as Car[];
      if (result.length === 0) {
        throw new Error("car not found");
      }
      const car = result[0];
      return car.country;
    } catch (error) {
      console.error(error);
      throw new Error("couldn't fetch car country");
    }
  }
}
export default CarStore;
