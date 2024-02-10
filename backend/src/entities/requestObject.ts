import { Request } from "express";
import { role } from "./adminEntity";
interface RequestObject extends Request {
  user_id?: number;
  role?: role;
  total_amount?: number;
  car_id?: number;
  user_email?: string;
  reset_exists?: boolean;
  verified?: number;
  car_country?: string;
  pickup_country?: string;
  return_country?: string;
}

export default RequestObject;
