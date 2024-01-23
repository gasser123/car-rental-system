import Admin from "../entities/adminEntity";
import DB from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { role } from "../entities/adminEntity";
dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
export type AdminInfo = {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  role: role;
};
class AdminStore {
  async createAdmin(admin: Admin): Promise<AdminInfo> {
    try {
      const { email, password, first_name, last_name, role } = admin;
      const sql =
        "INSERT INTO admin(email, password, first_name, last_name,  role) VALUES(?, ?, ?, ?, ?)";
      const hash = bcrypt.hashSync(
        password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      await DB.execute(sql, [email, hash, first_name, last_name, role]);
      const sql2 =
        "SELECT id, first_name, last_name, email, role FROM admin WHERE email = ?";
      const [rows] = await DB.execute(sql2, email);
      const result = rows as unknown as AdminInfo[];
      const adminResult = result[0];
      return adminResult;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't create admin`);
    }
  }

  async authenticate(
    email: string,
    password: string
  ): Promise<AdminInfo | null> {
    try {
      const sql = "SELECT * FROM admin WHERE email = ?";

      const [rows] = await DB.execute(sql, [email]);
      const result = rows as unknown as Admin[];
      if (result.length) {
        const admin = result[0];
        const check = bcrypt.compareSync(
          password + BCRYPT_PASSWORD,
          admin.password
        );
        if (check) {
          const adminInfo: AdminInfo = {
            id: admin.id,
            first_name: admin.first_name,
            last_name: admin.last_name,
            email: admin.email,
            role: admin.role,
          };
          return adminInfo;
        }
      }
      return null;
    } catch (err) {
      console.error(err);
      throw new Error(`Couldn't authenticate  Error`);
    }
  }

  async setToRoot(id: number): Promise<void> {
    try {
      const sql = "UPDATE admin SET role = 'root_admin' WHERE id = ?";
      await DB.execute(sql, [id]);
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't set admin role`);
    }
  }

  async getAllAdmins(): Promise<AdminInfo[] | null> {
    try {
      const sql = "SELECT id, email, first_name, last_name, role FROM admin";
      const [rows] = await DB.execute(sql);
      const result = rows as unknown as AdminInfo[];
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't get all admins`);
    }
  }

  async getAdminInfo(id: number): Promise<AdminInfo | null> {
    try {
      const sql =
        "SELECT id, email, first_name, last_name, role FROM admin WHERE id = ?";
      const [rows] = await DB.execute(sql, [id]);
      const result = rows as unknown as AdminInfo[];
      if (result.length === 0) {
        return null;
      }
      const adminInfo = result[0];
      return adminInfo;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't get customer info`);
    }
  }

  async deleteAdmin(id: number): Promise<void> {
    try {
      const sql = "DELETE FROM admin WHERE id = ?";
      await DB.execute(sql, [id]);
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't delete admin`);
    }
  }

  async emailAlreadyExists(email: string): Promise<boolean> {
    try {
      const sql = "SELECT * FROM admin WHERE email = ?";
      const [rows] = await DB.execute(sql, [email]);
      const result = rows as unknown as Admin[];
      if (result.length === 0) {
        return false;
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("couldn't check if email already exists");
    }
  }
}
export default AdminStore;
