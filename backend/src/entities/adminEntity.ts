type role = "root_admin" | "admin";
export interface Admin {
  id?: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: role;
}
