import CustomerReservation from "../../entities/customerReservation";
import classes from "./CustomerBooking.module.css";
import { formatDate } from "../../utilities/formatDate";
interface Props {
  customerReservationsInfo: CustomerReservation[];
  children?: React.ReactNode;
}

const CustomerBooking: React.FC<Props> = (props) => {
  const { customerReservationsInfo } = props;
  return (
    <>
      {customerReservationsInfo.map((element) => (
        <tr key={element.reservation_id}>
          <td>{element.reservation_id}</td>
          <td>{formatDate(new Date(element.reservation_date))}</td>
          <td>{formatDate(new Date(element.pickup_date))}</td>
          <td>{formatDate(new Date(element.return_date))}</td>
          <td>{"$" + element.total_amount}</td>
          <td>{element.plate_id}</td>
          <td>{element.model}</td>
          <td>{element.year}</td>
          <td>{element.color}</td>
          <td>
            <img
              src={element.image_url}
              alt="car"
              className={classes["car-image"]}
            />
          </td>
          <td>{element.pickup_country}</td>
          <td>{element.pickup_city}</td>
          <td>{element.pickup_address}</td>
          <td>{element.return_city}</td>
          <td>{element.return_address}</td>
        </tr>
      ))}
    </>
  );
};

export default CustomerBooking;
