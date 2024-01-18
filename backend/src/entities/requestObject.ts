import { Request } from "express";
import { role } from "./adminEntity";
interface RequestObject extends Request{
 user_id?: number;
 role?: role;
}

export default RequestObject;