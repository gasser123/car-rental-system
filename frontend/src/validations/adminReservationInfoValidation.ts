import AdminReservationInfo from "../entities/AdminReservationInfo";
export function isAdminReservationInfo(
  value: unknown
): value is AdminReservationInfo {
  if (
    value &&
    typeof value === "object" &&
    "reservation_id" in value &&
    "customer_email" in value &&
    "plate_id" in value &&
    "reservation_country" in value &&
    "pickup_city" in value &&
    "pickup_address" in value &&
    "return_city" in value &&
    "return_address" in value &&
    "reservation_date" in value &&
    "pickup_date" in value &&
    "return_date" in value &&
    "total_amount" in value &&
    "confirmed" in value &&
    typeof value.reservation_id === "number" &&
    typeof value.customer_email === "string" &&
    typeof value.plate_id === "string" &&
    typeof value.reservation_country === "string" &&
    typeof value.pickup_city === "string" &&
    typeof value.pickup_address === "string" &&
    typeof value.return_city === "string" &&
    typeof value.return_address === "string" &&
    typeof value.reservation_date === "string" &&
    typeof value.pickup_date === "string" &&
    typeof value.return_date === "string" &&
    typeof value.total_amount === "number" &&
    typeof value.confirmed === "number"
  ) {
    return true;
  }

  return false;
}

function isArrayOfAdminReservationInfo(
  value: unknown
): value is AdminReservationInfo[] {
  if (
    Array.isArray(value) &&
    value.every((element) => isAdminReservationInfo(element))
  ) {
    return true;
  }

  return false;
}

export default isArrayOfAdminReservationInfo;
