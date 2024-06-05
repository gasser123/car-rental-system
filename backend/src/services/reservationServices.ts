import DB from "../database";
import CustomerReservation from "../entities/customerReservation";
import AdminReservationInfo from "../entities/AdminReservationInfo";
export async function getCustomerReservations(
  user_id: number
): Promise<CustomerReservation[] | null> {
  try {
    const sql = `SELECT reservation.id AS reservation_id, reservation_date, pickup_date, return_date, total_amount, plate_id, model, year, color, image_url, pickup_location.country AS pickup_country, pickup_location.city AS pickup_city, pickup_location.address AS pickup_address, return_location.country AS return_country, return_location.city AS return_city, return_location.address AS return_address 
 FROM reservation INNER JOIN customer ON reservation.customer_id = customer.id
 INNER JOIN car ON reservation.car_id = car.id
 INNER JOIN pickup_location ON reservation.pickup_location_id = pickup_location.id
 INNER JOIN return_location ON reservation.return_location_id = return_location.id
 WHERE reservation.customer_id = ?`;

    const [rows] = await DB.execute(sql, [user_id]);
    const customerReservations = rows as CustomerReservation[];
    if (customerReservations.length === 0) {
      return null;
    }
    return customerReservations;
  } catch (error) {
    console.error(error);
    throw new Error("couldn't get customer reservations");
  }
}

export async function getAdminReservations(): Promise<
  AdminReservationInfo[] | null
> {
  try {
    const sql = `SELECT reservation.id AS reservation_id, email AS customer_email, plate_id, car.country AS reservation_country, pickup_location.city AS pickup_city, pickup_location.address AS pickup_address, return_location.city AS return_city, return_location.address AS return_address, reservation_date, pickup_date, return_date, total_amount, confirmed 
    FROM reservation INNER JOIN customer
    ON customer_id = customer.id
    INNER JOIN car
    ON car_id = car.id
    INNER JOIN pickup_location
    ON pickup_location_id = pickup_location.id
    INNER JOIN return_location
    ON return_location_id = return_location.id
    `;

    const [rows] = await DB.execute(sql);
    const adminReservations = rows as AdminReservationInfo[];
    if (adminReservations.length === 0) {
      return null;
    }
    return adminReservations;
  } catch (error) {
    console.error(error);
    throw new Error("couldn't get admin reservations info");
  }
}

export async function getAdminUnconfirmedReservations(): Promise<
  AdminReservationInfo[] | null
> {
  try {
    const sql = `SELECT reservation.id AS reservation_id, email AS customer_email, plate_id, car.country AS reservation_country, pickup_location.city AS pickup_city, pickup_location.address AS pickup_address, return_location.city AS return_city, return_location.address AS return_address, reservation_date, pickup_date, return_date, total_amount, confirmed 
    FROM reservation INNER JOIN customer
    ON customer_id = customer.id
    INNER JOIN car
    ON car_id = car.id
    INNER JOIN pickup_location
    ON pickup_location_id = pickup_location.id
    INNER JOIN return_location
    ON return_location_id = return_location.id
    WHERE confirmed = ?
    `;

    const [rows] = await DB.execute(sql, [0]);
    const adminReservations = rows as AdminReservationInfo[];
    if (adminReservations.length === 0) {
      return null;
    }
    return adminReservations;
  } catch (error) {
    console.error(error);
    throw new Error("couldn't get admin unconfirmed reservations info");
  }
}

export async function allReservationsAdvancedSearch(
  value: string
): Promise<AdminReservationInfo[] | null> {
  const idValue = parseInt(value);
  const numberValue = parseFloat(value);
  const valueSearch = `%${value}%`;
  try {
    const sql = `SELECT reservation.id AS reservation_id, email AS customer_email, plate_id, car.country AS reservation_country, pickup_location.city AS pickup_city, pickup_location.address AS pickup_address, return_location.city AS return_city, return_location.address AS return_address, reservation_date, pickup_date, return_date, total_amount, confirmed 
    FROM reservation INNER JOIN customer
    ON customer_id = customer.id
    INNER JOIN car
    ON car_id = car.id
    INNER JOIN pickup_location
    ON pickup_location_id = pickup_location.id
    INNER JOIN return_location
    ON return_location_id = return_location.id
    WHERE reservation_id = ? OR 
    customer_email LIKE ? OR 
    plate_id = ? OR 
    reservation_country LIKE ? OR 
    pickup_city LIKE ? OR 
    pickup_address LIKE ? OR 
    return_city LIKE ? OR 
    return_address LIKE ? OR 
    reservation_date LIKE ? OR 
    pickup_date LIKE ? OR 
    return_date LIKE ? OR 
    total_amount LIKE ? OR 
    confirmed = ? 
    `;
    const [rows] = await DB.execute(sql, [
      idValue,
      valueSearch,
      idValue,
      valueSearch,
      valueSearch,
      valueSearch,
      valueSearch,
      valueSearch,
      valueSearch,
      valueSearch,
      valueSearch,
      numberValue,
      idValue,
    ]);
    const result = rows as unknown as AdminReservationInfo[];
    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    console.error(error);
    throw new Error(`couldn't do an advanced search`);
  }
}

export async function unconfirmedReservationsAdvancedSearch(
  value: string
): Promise<AdminReservationInfo[] | null> {
  const idValue = parseInt(value);
  const numberValue = parseFloat(value);
  const valueSearch = `%${value}%`;
  try {
    const sql = `SELECT reservation.id AS reservation_id, email AS customer_email, plate_id, car.country AS reservation_country, pickup_location.city AS pickup_city, pickup_location.address AS pickup_address, return_location.city AS return_city, return_location.address AS return_address, reservation_date, pickup_date, return_date, total_amount, confirmed 
    FROM reservation INNER JOIN customer
    ON customer_id = customer.id
    INNER JOIN car
    ON car_id = car.id
    INNER JOIN pickup_location
    ON pickup_location_id = pickup_location.id
    INNER JOIN return_location
    ON return_location_id = return_location.id
    WHERE reservation_id = ? OR 
    customer_email LIKE ? OR 
    plate_id = ? OR 
    reservation_country LIKE ? OR 
    pickup_city LIKE ? OR 
    pickup_address LIKE ? OR 
    return_city LIKE ? OR 
    return_address LIKE ? OR 
    reservation_date LIKE ? OR 
    pickup_date LIKE ? OR 
    return_date LIKE ? OR 
    total_amount LIKE ? OR 
    confirmed = 0 
    `;
    const [rows] = await DB.execute(sql, [
      idValue,
      valueSearch,
      idValue,
      valueSearch,
      valueSearch,
      valueSearch,
      valueSearch,
      valueSearch,
      valueSearch,
      valueSearch,
      valueSearch,
      numberValue,
    ]);
    const result = rows as unknown as AdminReservationInfo[];
    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    console.error(error);
    throw new Error(`couldn't do an advanced search`);
  }
}
