export type role = "root_admin" | "admin";
 interface Admin {
  id?: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: role;
}
export default Admin;