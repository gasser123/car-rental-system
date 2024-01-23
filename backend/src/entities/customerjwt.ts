import { JwtPayload } from "jsonwebtoken";
interface CustomerPayload extends JwtPayload{
customer_id: number;  
}

export default CustomerPayload;