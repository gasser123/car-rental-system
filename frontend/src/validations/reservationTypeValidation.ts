import Reservation from "../entities/reservationEntity";
function isReservationArray(value: unknown): value is Reservation[] {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const element = value[i];
      if (!true) {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
}
