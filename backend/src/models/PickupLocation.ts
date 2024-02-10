import PickupLocation from "../entities/pickupLocationEntity";
import DB from "../database";
class PickupLocationStore {
  async createPickupLocation(pickupLocation: PickupLocation): Promise<void> {
    try {
      const { country, city, address } = pickupLocation;
      const sql =
        "INSERT INTO pickup_location(country, city, address) VALUES(?, ?, ?)";
      await DB.execute(sql, [country, city, address]);
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't create pickup location`);
    }
  }

  async getAll(): Promise<PickupLocation[] | null> {
    try {
      const sql = "SELECT * FROM pickup_location";
      const [rows] = await DB.execute(sql);
      const result = rows as unknown as PickupLocation[];
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't get all pickup locations`);
    }
  }

  async updatePickupLocation(pickupLocation: PickupLocation): Promise<void> {
    try {
      const { id, country, city, address } = pickupLocation;
      const sql =
        "UPDATE pickup_location SET country = ?, city = ?, address = ? WHERE id = ?";
      await DB.execute(sql, [country, city, address, id]);
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't update pickup location`);
    }
  }

  async deletePickupLocation(id: number): Promise<void> {
    try {
      const sql = "DELETE FROM pickup_location WHERE id = ?";
      await DB.execute(sql, [id]);
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't delete pickup location`);
    }
  }

  async getByCountry(country: string): Promise<PickupLocation[] | null> {
    try {
      const sql = "SELECT * FROM pickup_location WHERE country = ?";
      const [rows] = await DB.execute(sql, [country]);
      const result = rows as unknown as PickupLocation[];
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't get country pickup locations`);
    }
  }
  async searchByCountry(
    country: string,
    value: string
  ): Promise<PickupLocation[] | null> {
    try {
      const searchValue = `%${value}%`;
      const sql =
        "SELECT * FROM pickup_location WHERE city LIKE ? OR address LIKE ? AND country = ?";
      const [rows] = await DB.execute(sql, [searchValue, searchValue, country]);
      const result = rows as unknown as PickupLocation[];
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't search country pickup locations`);
    }
  }

  async advancedSearch(value: string): Promise<PickupLocation[] | null> {
    try {
      const idValue = parseInt(value);
      const searchValue = `%${value}%`;
      const sql =
        "SELECT * FROM pickup_location WHERE id = ? OR city LIKE ? OR address LIKE ? OR country LIKE ?";
      const [rows] = await DB.execute(sql, [
        idValue,
        searchValue,
        searchValue,
        searchValue,
      ]);
      const result = rows as unknown as PickupLocation[];
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't get do an advanced search on pickup locations`);
    }
  }
  async locationAlreadyExists(location: PickupLocation): Promise<boolean> {
    try {
      const sql =
        "SELECT * FROM pickup_location WHERE city = ? AND address = ? AND country = ?";
      const [rows] = await DB.execute(sql, [
        location.city,
        location.address,
        location.country,
      ]);
      const result = rows as PickupLocation[];
      if (result.length === 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("couldn't check if location already exists");
    }
  }
  async editLocationAlreadyExists(location: PickupLocation): Promise<boolean> {
    try {
      if (!location.id) {
        throw new Error("car id not found");
      }
      const sql =
        "SELECT * FROM pickup_location WHERE city = ? AND address = ? AND country = ? AND id != ?";
      const [rows] = await DB.execute(sql, [
        location.city,
        location.address,
        location.country,
        location.id,
      ]);
      const result = rows as PickupLocation[];
      if (result.length === 0) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("couldn't check if location already exists");
    }
  }

  async getLocationCountry(id: number): Promise<string> {
    try {
      const sql = "SELECT * FROM pickup_location WHERE id = ?";
      const [rows] = await DB.execute(sql, id);
      const result = rows as PickupLocation[];
      if (result.length === 0) {
        throw new Error("pickup location not found");
      }
      const location = result[0];
      return location.country;
    } catch (error) {
      console.error(error);
      throw new Error("couldn't fetch location country");
    }
  }
}
export default PickupLocationStore;
