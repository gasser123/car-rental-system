import Reservation from "./reservationEntity";
type ReservationOrderInfo = Pick<
  Reservation,
  | "car_id"
  | "pickup_date"
  | "pickup_location_id"
  | "return_date"
  | "return_location_id"
  | "total_amount"
>;

export default ReservationOrderInfo;
