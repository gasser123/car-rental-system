import ReturnLocation from "../entities/returnLocationEntity";
import DB from "../database";
class ReturnLocationStore {
  async createReturnLocation(returnLocation: ReturnLocation): Promise<void> {
    try {
      const { country, city, address } = returnLocation;
      const sql =
        "INSERT INTO return_location(country, city, address) VALUES(?, ?, ?)";
      await DB.execute(sql, [country, city, address]);
    } catch (error) {
      throw new Error(`couldn't create return location: ${error}`);
    }
  }

  async getAll(): Promise<ReturnLocation[] | null> {
    try {
      const sql = "SELECT * FROM return_location";
      const [rows] = await DB.execute(sql);
      const result = rows as unknown as ReturnLocation[];
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      throw new Error(`couldn't get all return locations: ${error}`);
    }
  }

  async updateReturnLocation(returnLocation: ReturnLocation): Promise<void> {
    try {
      const { id, country, city, address } = returnLocation;
      const sql =
        "UPDATE return_location SET country = ?, city = ?, address = ? WHERE id = ?";
      await DB.execute(sql, [country, city, address, id]);
    } catch (error) {
      throw new Error(`couldn't update return location: ${error}`);
    }
  }

  async deleteReturnLocation(id: number): Promise<void> {
    try {
      const sql = "DELETE FROM return_location WHERE id = ?";
      await DB.execute(sql, [id]);
    } catch (error) {
      throw new Error(`couldn't delete return location: ${error}`);
    }
  }

  async searchByCountry(
    country: string,
    value: string
  ): Promise<ReturnLocation[] | null> {
    try {
      const searchValue = `%${value}%`;
      const sql =
        "SELECT * FROM return_location WHERE city LIKE ? OR address LIKE ? AND country = ?";
      const [rows] = await DB.execute(sql, [searchValue, searchValue, country]);
      const result = rows as unknown as ReturnLocation[];
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      throw new Error(`couldn't get country return locations: ${error}`);
    }
  }

  async advancedSearch(value: string): Promise<ReturnLocation[] | null>{
    try {
        const idValue = parseInt(value);
        const searchValue = `%${value}%`;
        const sql =
          "SELECT * FROM return_location WHERE id = ? OR city LIKE ? OR address LIKE ? OR country LIKE ?";
        const [rows] = await DB.execute(sql, [idValue, searchValue, searchValue, searchValue]);
        const result = rows as unknown as ReturnLocation[];
        if (result.length === 0) {
          return null;
        }
        return result;
      } catch (error) {
        throw new Error(`couldn't get do an advanced search on pickup locations: ${error}`);
      }
  }


}
export default ReturnLocationStore;