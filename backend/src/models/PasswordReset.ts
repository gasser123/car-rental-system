import PasswordReset from "../entities/passwordResetEntity";
import crypto from "node:crypto";
import DB from "../database";
import dotenv from "dotenv";
dotenv.config();
const { REACT_PORT } = process.env;
const react_port = REACT_PORT || "3000";
class PasswordResetStore {
  async createPasswordReset(customer_id: number): Promise<string> {
    try {
      const uniqueString = crypto.randomUUID();
      const token = uniqueString + customer_id;
      const passwordReset: PasswordReset = {
        customer_id: customer_id,
        created_at: Date.now(),
        expires_at: Date.now() + 1000 * 60 * 60 * 1,
        token: token,
      };

      const sql =
        "INSERT INTO reset(customer_id, created_at, expires_at, token) VALUES(?,?,?,?)";
      await DB.execute(sql, [
        passwordReset.customer_id,
        passwordReset.created_at,
        passwordReset.expires_at,
        passwordReset.token,
      ]);

      const activationURL = `http://localhost:${react_port}/reset/${token}`;
      return activationURL;
    } catch (error) {
      console.error(error);
      throw new Error("couldn't create password reset");
    }
  }
  async updatePasswordReset(customer_id: number): Promise<string> {
    try {
      const uniqueString = crypto.randomUUID();
      const token = uniqueString + customer_id;
      const passwordReset: PasswordReset = {
        customer_id: customer_id,
        created_at: Date.now(),
        expires_at: Date.now() + 1000 * 60 * 60 * 2,
        token: token,
      };

      const sql =
        "UPDATE reset SET created_at = ?, expires_at = ?, token = ? WHERE customer_id = ?";
      await DB.execute(sql, [
        passwordReset.created_at,
        passwordReset.expires_at,
        passwordReset.token,
        passwordReset.customer_id,
      ]);

      const activationURL = `http://localhost:${react_port}/reset/${token}`;
      return activationURL;
    } catch (error) {
      console.error(error);
      throw new Error("couldn't create password reset");
    }
  }

  async findToken(token: string): Promise<number | null> {
    try {
      const sql = "SELECT * FROM reset WHERE token = ?";
      const [rows] = await DB.execute(sql, [token]);
      const result = rows as PasswordReset[];
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
      const sql = "SELECT * FROM reset WHERE token = ?";
      const [rows] = await DB.execute(sql, [token]);
      const result = rows as PasswordReset[];
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

  async resetExists(id: number):Promise<boolean>{
    try {
     const sql = "SELECT * FROM reset WHERE customer_id = ?";
     const [rows] = await DB.execute(sql, [id]);
     const result = rows as PasswordReset[];
     if(result.length === 0){
         return false;
     }
     return true;    
    } catch (error) {
      console.error(error);
      throw new Error("couldn't check reset");  
    }
  }
}

export default PasswordResetStore;