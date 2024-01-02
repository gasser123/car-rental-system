import Admin from "../entities/adminEntity";
import DB from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { role } from "../entities/adminEntity";
dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
type AdminInfo = {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  role: role;
};
class AdminStore {
  async createAdmin(admin: Admin): Promise<void> {
    try {
      const { email, password, first_name, last_name, role } = admin;
      const sql =
        "INSERT INTO admin(email, password, first_name, last_name,  role) VALUES(?, ?, ?, ?, ?)";
      const hash = bcrypt.hashSync(
        password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      await DB.execute(sql, [email, hash, first_name, last_name, role]);
    } catch (error) {
      throw new Error(`couldn't create admin: ${error}`);
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
      throw new Error(`Couldn't authenticate  Error: ${err}`);
    }
  }

  async setToRoot(id: number): Promise<void> {
    try {
      const sql = "UPDATE admin SET role = 'root_admin' WHERE id = ?";
      await DB.execute(sql, [id]);
    } catch (error) {
      throw new Error(`couldn't set admin role: ${error}`);
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
      throw new Error(`couldn't get all admins: ${error}`);
    }
  }

  async deleteAdmin(id: number): Promise<void> {
    try {
      const sql = "DELETE FROM admin WHERE id = ?";
      await DB.execute(sql, [id]);
    } catch (error) {
      throw new Error(`couldn't delete admin: ${error}`);
    }
  }
}
export default AdminStore;
