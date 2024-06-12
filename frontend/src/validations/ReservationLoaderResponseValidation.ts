import ReservationLoaderResponse from "../entities/ReservationLoaderResponse";
import { isPickupLocation } from "./pickuplocationResponseValidation";
import { isReturnLocation } from "./returnLocationResponseValidation";
import { isCar } from "./carResponseValidations";

function isReservationLoaderResponse(
  value: unknown
): value is ReservationLoaderResponse {
  if (
    value &&
    typeof value === "object" &&
    "pickupLocation" in value &&
    "returnLocation" in value &&
    "car" in value &&
    isPickupLocation(value.pickupLocation) &&
    isReturnLocation(value.returnLocation) &&
    isCar(value.car)
  ) {
    return true;
  }

  return false;
}

export default isReservationLoaderResponse;
