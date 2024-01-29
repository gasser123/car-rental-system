import Reservation from "../entities/reservationEntity";
import DB from "../database";
class ReservationStore {
  async createReservation(reservation: Reservation): Promise<Reservation> {
    try {
      const {
        customer_id,
        car_id,
        pickup_location_id,
        return_location_id,
        pickup_date,
        return_date,
        total_amount,
      } = reservation;
      const sql =
        "INSERT INTO reservation(customer_id, car_id, pickup_location_id, return_location_id, reservation_date,  pickup_date, return_date, total_amount) VALUES(?, ?, ?, ?, now(), ?, ?, ?)";
      await DB.execute(sql, [
        customer_id,
        car_id,
        pickup_location_id,
        return_location_id,
        pickup_date,
        return_date,
        total_amount,
      ]);
      const sql2 =
        "SELECT * FROM reservation WHERE car_id = ? AND pickup_date = ? AND return_date = ?";
      const [rows] = await DB.execute(sql2, [car_id, pickup_date, return_date]);
      const result = rows as unknown as Reservation[];
      const reservationResult = result[0];
      if (!reservationResult) {
        throw new Error("reservation result is null");
      }
      return reservationResult;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't create reservation`);
    }
  }

  async getAllReservations(): Promise<Reservation[] | null> {
    try {
      const sql = "SELECT * FROM reservation";
      const [rows] = await DB.execute(sql);
      const result = rows as unknown as Reservation[];
      if (result.length === 0) {
        return null;
      }

      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`couldn't get all reservations`);
    }
  }

  
}

export default ReservationStore;
