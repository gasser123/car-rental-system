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
      throw new Error(`couldn't create car: ${error}`);
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
      throw new Error(`couldn't get all cars: ${error}`);
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
      throw new Error(`couldn't update car: ${error}`);
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
      throw new Error(`couldn't search by country: ${error}`);
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
      throw new Error(`couldn't get country available cars: ${error}`);
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
      throw new Error(`couldn't get countries: ${error}`);
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
      throw new Error(`couldn't do a search: ${error}`);
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
      throw new Error(`couldn't do an advanced search: ${error}`);
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
      throw new Error(`couldn't check if car is available: ${error}`);
    }
  }

  async updateToRented(id: number): Promise<void> {
    try {
      const sql = "UPDATE car SET status = 'Rented' WHERE id = ?";
      await DB.execute(sql, [id]);
    } catch (error) {
      throw new Error(`couldn't update car to rented: ${error}`);
    }
  }
}
export default CarStore;