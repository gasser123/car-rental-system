import { isNumber, isValidDate } from "./typeValidation";
class ReservationValidator {
  validateId(id: unknown): boolean {
    if (!id) {
      return false;
    }
    const typeNumber = isNumber(id);
    if (!typeNumber) {
      return false;
    }

    return true;
  }

  validateDate(date: unknown): boolean {
    if (!date) {
      return false;
    }

    if (typeof date !== "string") {
      return false;
    }

    const validDate = isValidDate(date);
    if (!validDate) {
      return false;
    }

    return true;
  }

  validatePickupReturnDates(pickup_date: string, return_date: string): boolean {
    const pickupTime = new Date(pickup_date).getTime();
    const returnTime = new Date(return_date).getTime();
    const timeNow = Date.now();
    if (pickupTime < timeNow) {
      return false;
    }
    if (pickupTime < timeNow + 1 * 60 * 60 * 1000) {
      return false;
    }

    if (returnTime < timeNow) {
      return false;
    }

    if (returnTime < pickupTime) {
      return false;
    }

    return true;
  }
}
export default ReservationValidator;
