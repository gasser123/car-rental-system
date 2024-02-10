import { JwtPayload } from "jsonwebtoken";
type verified = 0 | 1;
interface CustomerPayload extends JwtPayload{
customer_id: number;
verified: verified;   
}

export default CustomerPayload;