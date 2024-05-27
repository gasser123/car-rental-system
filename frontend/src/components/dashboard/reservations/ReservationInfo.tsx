import AdminReservationInfo from "../../../entities/AdminReservationInfo";
interface Props {
  adminReservationsInfo: AdminReservationInfo[];
  children?: React.ReactNode;
}

const ReservationInfo: React.FC<Props> = (props) => {
  const { adminReservationsInfo } = props;
  return (
    <>
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
    </>
  );
};

export default ReservationInfo;
