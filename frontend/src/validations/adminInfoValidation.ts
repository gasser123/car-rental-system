type role = "root_admin" | "admin";
export type AdminInfo = {
  id: number;
  email?: string;
  first_name: string;
  last_name: string;
  role: role;
};

function isAdminInfo(value: unknown): value is AdminInfo {
  if (
   value &&
   typeof value === "object" &&
   "id" in value &&
   typeof value.id === "number" &&
   (("email" in value &&
   typeof value.email === "string" ) || "email" in value === false)&&
   "first_name" in value &&
   typeof value.first_name === "string" &&
   "last_name" in value &&
   typeof value.last_name === "string" &&
   "role" in value &&
   typeof value.role === "string" &&
   (value.role === "root_admin" || value.role === "admin")
    
  ) {
    return true;
  }
  return false;
}

export function isArrayOfAdminInfo(value: unknown): value is AdminInfo[]{

  return Array.isArray(value) && value.every((element)=>isAdminInfo(element));
}

export default isAdminInfo;
