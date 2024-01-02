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
      throw new Error(`couldn't create pickup location: ${error}`);
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
      throw new Error(`couldn't get all pickup locations: ${error}`);
    }
  }

  async updatePickupLocation(pickupLocation: PickupLocation): Promise<void> {
    try {
      const { id, country, city, address } = pickupLocation;
      const sql =
        "UPDATE pickup_location SET country = ?, city = ?, address = ? WHERE id = ?";
      await DB.execute(sql, [country, city, address, id]);
    } catch (error) {
      throw new Error(`couldn't update pickup location: ${error}`);
    }
  }

  async deletePickupLocation(id: number): Promise<void> {
    try {
      const sql = "DELETE FROM pickup_location WHERE id = ?";
      await DB.execute(sql, [id]);
    } catch (error) {
      throw new Error(`couldn't delete pickup location: ${error}`);
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
      throw new Error(`couldn't get country pickup locations: ${error}`);
    }
  }

  async advancedSearch(value: string): Promise<PickupLocation[] | null>{
    try {
        const idValue = parseInt(value);
        const searchValue = `%${value}%`;
        const sql =
          "SELECT * FROM pickup_location WHERE id = ? OR city LIKE ? OR address LIKE ? OR country LIKE ?";
        const [rows] = await DB.execute(sql, [idValue, searchValue, searchValue, searchValue]);
        const result = rows as unknown as PickupLocation[];
        if (result.length === 0) {
          return null;
        }
        return result;
      } catch (error) {
        throw new Error(`couldn't get do an advanced search on pickup locations: ${error}`);
      }
  }
}
export default PickupLocationStore;
