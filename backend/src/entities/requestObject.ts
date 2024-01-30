import { Request } from "express";
import { role } from "./adminEntity";
interface RequestObject extends Request {
  user_id?: number;
  role?: role;
  total_amount?: number;
  car_id?: number;
  user_email?: string;
}

export default RequestObject;
