import AdminReservationInfo from "../../../entities/AdminReservationInfo";
import Table from "../../UI/Table";
import ReservationInfo from "./ReservationInfo";
interface Props {
  adminReservationsInfo: AdminReservationInfo[] | null;
  children?: React.ReactNode;
}
const ReservationsInfo: React.FC<Props> = (props) => {
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
        <ReservationInfo adminReservationsInfo={adminReservationsInfo} />
      </tbody>
    </Table>
  ) : (
    <h2 style={{ textAlign: "center", margin: "0 auto" }}>
      No reservations found at the moment
    </h2>
  );
};

export default ReservationsInfo;
