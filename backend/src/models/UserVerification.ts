import UserVerification from "../entities/userVerificationEntity";
import crypto from "node:crypto";
import DB from "../database";
class UserVerificationStore {
  async createUserVerification(customer_id: number): Promise<string> {
    try {
      const uniqueString = crypto.randomUUID();
      const token = uniqueString + customer_id;
      const verification: UserVerification = {
        customer_id: customer_id,
        created_at: Date.now(),
        expires_at: Date.now() + 1000 * 60 * 60 * 2,
        token: token,
      };

      const sql =
        "INSERT INTO verification(customer_id, created_at, expires_at, hash) VALUES(?,?,?,?)";
      await DB.execute(sql, [
        verification.customer_id,
        verification.created_at,
        verification.expires_at,
        verification.token,
      ]);

      const activationURL = `http://localhost:3000/activation?token=${token}`;
      return activationURL;
    } catch (error) {
      console.error(error);
      throw new Error("couldn't create user verification");
    }
  }
  async updateUserVerification(customer_id: number): Promise<string> {
    try {
      const uniqueString = crypto.randomUUID();
      const token = uniqueString + customer_id;
      const verification: UserVerification = {
        customer_id: customer_id,
        created_at: Date.now(),
        expires_at: Date.now() + 1000 * 60 * 60 * 2,
        token: token,
      };

      const sql =
        "UPDATE verification SET created_at = ?, expires_at = ?, hash = ? WHERE customer_id =  )";
      await DB.execute(sql, [
        verification.customer_id,
        verification.created_at,
        verification.expires_at,
        verification.token,
      ]);

      const activationURL = `http://localhost:3000/activation?token=${token}`;
      return activationURL;
    } catch (error) {
      console.error(error);
      throw new Error("couldn't create user verification");
    }
  }

  async findToken(token: string): Promise<number | null> {
    try {
      const sql = "SELECT * FROM verification WHERE token = ?";
      const [rows] = await DB.execute(sql, [token]);
      const result = rows as UserVerification[];
      if (result.length === 0) {
        return null;
      }
      const customer_id = result[0].customer_id;
      return customer_id;
    } catch (error) {
      console.error(error);
      throw new Error("couldn't find token");
    }
  }

  async isExpired(token: string): Promise<boolean> {
    try {
      const sql = "SELECT * FROM verification WHERE token = ?";
      const [rows] = await DB.execute(sql, [token]);
      const result = rows as UserVerification[];
      if (result.length === 0) {
        throw new Error("token not found");
      }
      const { expires_at } = result[0];
      const check = expires_at - Date.now();
      if (check < 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      throw new Error("error checking token");
    }
  }
}

export default UserVerificationStore;
