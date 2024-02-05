import Customer from "../entities/customerEntity";
import DB from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
export type CustomerInfo = {
  id?: number;
  driver_license_no: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  verified?: number;
};
class CustomerStore {
  async createCustomer(customer: Customer): Promise<CustomerInfo> {
    try {
      const {
        driver_license_no,
        first_name,
        last_name,
        email,
        password,
        mobile_no,
      } = customer;
      const hash = bcrypt.hashSync(
        password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );

      const sql =
        "INSERT INTO customer(driver_license_no, first_name, last_name, email, password, mobile_no) VALUES(?, ?, ?, ?, ?, ?)";
      await DB.execute(sql, [
        driver_license_no,
        first_name,
        last_name,
        email,
        hash,
        mobile_no,
      ]);
      const sql2 =
        "SELECT id, driver_license_no, first_name, last_name, email, mobile_no, verified FROM customer WHERE email = ?";
      const [rows] = await DB.execute(sql2, [email]);
      const result = rows as unknown as CustomerInfo[];
      const customerResult = result[0];
      return customerResult;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't create customer`);
    }
  }

  async authenticate(
    email: string,
    password: string
  ): Promise<CustomerInfo | null> {
    try {
      const sql = "SELECT * FROM customer WHERE email = ?";

      const [rows] = await DB.execute(sql, [email]);
      const result = rows as unknown as Customer[];
      if (result.length) {
        const customer = result[0];
        const check = bcrypt.compareSync(
          password + BCRYPT_PASSWORD,
          customer.password
        );
        if (check) {
          const customerInfo: CustomerInfo = {
            id: customer.id,
            driver_license_no: customer.driver_license_no,
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            mobile_no: customer.mobile_no,
            verified: customer.verified,
          };
          return customerInfo;
        }
      }
      return null;
    } catch (err) {
      console.error(err);
      throw new Error(`Couldn't authenticate`);
    }
  }

  async getAllCustomers(): Promise<CustomerInfo[] | null> {
    try {
      const sql =
        "SELECT id, driver_license_no, first_name, last_name, email, mobile_no FROM customer";
      const [rows] = await DB.execute(sql);
      const result = rows as unknown as CustomerInfo[];
      if (result.length === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't get all customers`);
    }
  }
  async getCustomerInfo(id: number): Promise<CustomerInfo | null> {
    try {
      const sql =
        "SELECT id, driver_license_no, first_name, last_name, email, mobile_no FROM customer WHERE id = ?";
      const [rows] = await DB.execute(sql, [id]);
      const result = rows as unknown as CustomerInfo[];
      if (result.length === 0) {
        return null;
      }
      const customerInfo = result[0];
      return customerInfo;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't get customer info`);
    }
  }

  async updateCustomerInfo(customerInfo: CustomerInfo): Promise<void> {
    try {
      const { id, driver_license_no, first_name, last_name, email, mobile_no } =
        customerInfo;
      const sql =
        "UPDATE customer SET driver_license_no = ?, first_name = ?, last_name = ?, email = ?, mobile_no = ? WHERE id = ?";
      await DB.execute(sql, [
        driver_license_no,
        first_name,
        last_name,
        email,
        mobile_no,
        id,
      ]);
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't update customer info`);
    }
  }

  async updateCustomerPassword(id: number, password: string): Promise<void> {
    try {
      const sql = "UPDATE customer SET password = ? WHERE id = ?";
      const hash = bcrypt.hashSync(
        password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );
      await DB.execute(sql, [hash, id]);
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't update customer password`);
    }
  }

  async confirmCurrentPassword(id: number, password: string): Promise<boolean> {
    try {
      const sql = "SELECT password FROM customer WHERE id = ?";
      const [rows] = await DB.execute(sql, [id]);
      const result = rows as unknown as { password: string }[];
      if (result.length === 0) {
        throw new Error("couldn't find the user to confirm password");
      }

      const currentPassword = result[0].password;
      const check = bcrypt.compareSync(
        password + BCRYPT_PASSWORD,
        currentPassword
      );
      return check;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't confirm current password`);
    }
  }

  async advancedSearch(value: string): Promise<CustomerInfo[] | null> {
    const idValue = parseInt(value);
    const valueSearch = `%${value}%`;
    try {
      const sql =
        "SELECT id, driver_license_no, first_name, last_name, email, mobile_no FROM customer WHERE id = ? OR driver_license_no LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR mobile_no LIKE ?";
      const [rows] = await DB.execute(sql, [
        idValue,
        valueSearch,
        valueSearch,
        valueSearch,
        valueSearch,
        valueSearch,
      ]);
      const result = rows as unknown as CustomerInfo[];
      if (result.length === 0) {
        return null;
      }

      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't do an advanced search`);
    }
  }

  async emailAlreadyExists(email: string): Promise<boolean> {
    try {
      const sql = "SELECT * FROM customer WHERE email = ?";
      const [rows] = await DB.execute(sql, [email]);
      const result = rows as unknown as Customer[];
      if (result.length === 0) {
        return false;
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("couldn't check if email already exists");
    }
  }

  async verifyCustomer(id: number) {
    try {
      const sql = "UPDATE customer SET verified = ? WHERE id = ?";
      await DB.execute(sql, [1, id]);
    } catch (error) {
      console.error(error);
      throw new Error("couldn't activate user account");
    }
  }

  async isVerified(id: number): Promise<boolean> {
    try {
      const sql = "SELECT verified FROM customer WHERE id = ?";
      const [rows] = await DB.execute(sql, [id]);
      const result = rows as { verified: number }[];
      if (result.length === 0) {
        return false;
      }
      const verified = result[0].verified;
      if (verified) {
        return true;
      }

      return false;
    } catch (error) {
      throw new Error("couldn't check if user is verified");
    }
  }
  async getId(email: string): Promise<number | null> {
    try {
      const sql = "SELECT id FROM customer WHERE email = ?";
      const [rows] = await DB.execute(sql, [email]);
      const result = rows as { id: number }[];
      if (result.length === 0) {
        return null;
      }
      const id = result[0].id;
      return id;
    } catch (error) {
      console.error(error);
      throw new Error("error getting the id of user");
    }
  }
}
export default CustomerStore;
