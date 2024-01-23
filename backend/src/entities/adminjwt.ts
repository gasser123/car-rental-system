import { JwtPayload } from "jsonwebtoken";
import { role } from "./adminEntity";
interface AdminPayload extends JwtPayload{
admin_id: number;
admin_role: role;  
}

export default AdminPayload;