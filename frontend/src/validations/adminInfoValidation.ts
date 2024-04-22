type role = "root_admin" | "admin";
export type AdminInfo = {
  id: number;
  email?: string;
  first_name: string;
  last_name: string;
  role: role;
};

function isAdminInfo(value: unknown): value is AdminInfo {
  const valueCheck = value as AdminInfo;

  if (
    valueCheck.first_name !== undefined &&
    valueCheck.last_name !== undefined &&
    valueCheck.email !== undefined &&
    valueCheck.id !== undefined &&
    valueCheck.role !== undefined
  ) {
    return true;
  }
  return false;
}

export default isAdminInfo;
