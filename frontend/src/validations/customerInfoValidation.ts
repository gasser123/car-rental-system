export type CustomerInfo = {
  id: number;
  driver_license_no: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  verified: number;
};
function isCustomerInfo(value: unknown): value is CustomerInfo {
  const valueCheck = value as CustomerInfo;
  if (
    valueCheck.first_name !== undefined &&
    valueCheck.last_name !== undefined &&
    valueCheck.driver_license_no !== undefined &&
    valueCheck.email !== undefined &&
    valueCheck.id !== undefined &&
    valueCheck.mobile_no !== undefined &&
    valueCheck.verified !== undefined
  ) {
    return true;
  }
  return false;
}

export default isCustomerInfo;
