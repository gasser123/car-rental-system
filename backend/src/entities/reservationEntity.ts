interface Reservation {
  id?: number;
  customer_id: number;
  car_id: number;
  pickup_location_id: number;
  return_location_id: number;
  reservation_date?: string;
  pickup_date: string;
  return_date: string;
  total_amount: number;
  confirmed?: number;
}
export default Reservation;
