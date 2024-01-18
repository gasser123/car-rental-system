import { JwtPayload } from "jsonwebtoken";
interface CustomerPayload extends JwtPayload{
customer_id: number; 
customer_email: string; 

}

export default CustomerPayload;