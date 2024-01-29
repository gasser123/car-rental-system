import DB from "../database";
import CustomerReservation from "../entities/customerReservation";
export async function getCustomerReservations(user_id: number):Promise<CustomerReservation[] | null>{
 try {
    const sql = `SELECT reservation.id as reservation_id, reservation_date, pickup_date, return_date, total_amount, plate_id, model, year, color, image_url, pickup_location.country as pickup_country, pickup_location.city as pickup_city, pickup_location.address as pickup_address, return_location.country as return_country, return_location.city as return_city, return_location.address as return_address 
 FROM reservation INNER JOIN customer ON reservation.customer_id = customer.id
 INNER JOIN car ON reservation.car_id = car.id
 INNER JOIN pickup_location ON reservation.pickup_location_id = pickup_location.id
 INNER JOIN return_location ON reservation.return_location_id = return_location.id
 WHERE reservation.customer_id = ?`;

 const [rows] = await DB.execute(sql, [user_id]);
 const customerReservations = rows as CustomerReservation[];
  return customerReservations;
 } catch (error) {
   console.error(error);
   throw new Error("couldn't get customer reservations");  
 }
 
}