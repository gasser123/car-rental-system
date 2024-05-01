interface AdminReservationInfo {
  reservation_id: number;
  customer_email: string;
  plate_id: string;
  reservation_country: string;
  pickup_city: string;
  pickup_address: string;
  return_city: string;
  return_address: string;
  reservation_date: string;
  pickup_date: string;
  return_date: string;
  total_amount: number;
  confirmed: number;
}
export default AdminReservationInfo;
