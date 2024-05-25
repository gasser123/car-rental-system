import AdminReservationInfo from "../../../entities/AdminReservationInfo";
import Table from "../../UI/Table";
interface Props {
  adminReservationsInfo: AdminReservationInfo[] | null;
  children?: React.ReactNode;
}
const UnconfirmedReservations: React.FC<Props> = (props) => {
  const { adminReservationsInfo } = props;
  return adminReservationsInfo ? (
    <Table>
      <thead>
        <tr>
          <th>reservation id</th>
          <th>customer email</th>
          <th>plate id</th>
          <th>reservation country</th>
          <th>pickup city</th>
          <th>pickup address</th>
          <th>return city</th>
          <th>return address</th>
          <th>reservation date</th>
          <th>pickup date</th>
          <th>return date</th>
          <th>total amount</th>
          <th>confirmed</th>
        </tr>
      </thead>
      <tbody>
        {adminReservationsInfo.map((element) => (
          <tr key={element.reservation_id}>
            <td>{element.reservation_id}</td>
            <td>{element.customer_email}</td>
            <td>{element.plate_id}</td>
            <td>{element.reservation_country}</td>
            <td>{element.pickup_city}</td>
            <td>{element.pickup_address}</td>
            <td>{element.return_city}</td>
            <td>{element.return_address}</td>
            <td>{element.reservation_date}</td>
            <td>{element.pickup_date}</td>
            <td>{element.return_date}</td>
            <td>{element.total_amount}</td>
            <td>{element.confirmed}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <h2 style={{ textAlign: "center", margin: "0 auto" }}>
      No reservations found at the moment
    </h2>
  );
};

export default UnconfirmedReservations;
