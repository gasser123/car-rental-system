import CustomerReservation from "../../entities/customerReservation";
import Table from "../UI/Table";
import classes from "./CustomerBookings.module.css";
import CustomerBooking from "./CustomerBooking";
interface Props {
  customerReservationsInfo: CustomerReservation[] | null;
  children?: React.ReactNode;
}
const CustomerBookings: React.FC<Props> = (props) => {
  const { customerReservationsInfo } = props;
  return customerReservationsInfo ? (
    <div className={classes["bookings-main"]}>
    <Table>
      <thead>
        <tr>
          <th>Reservation id</th>
          <th>Reservation date</th>
          <th>pickup date</th>
          <th>return date</th>
          <th>total amount</th>
          <th>plate id</th>
          <th>Model</th>
          <th>Year</th>
          <th>Color</th>
          <th>Image</th>
          <th>reservation country</th>
          <th>pickup city</th>
          <th>pickup address</th>
          <th>return city</th>
          <th>return address</th>
        </tr>
      </thead>
      <tbody>
        <CustomerBooking customerReservationsInfo={customerReservationsInfo} />
      </tbody>
    </Table>
    </div>
  ) : (
    <h2 style={{ textAlign: "center", margin: "0 auto" }}>
      No reservations found at the moment
    </h2>
  );
};

export default CustomerBookings;
