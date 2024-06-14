import CustomerReservation from "../../entities/customerReservation";
import classes from "./CustomerBooking.module.css";
import {
  convertMysqlDateTimeToIsoString,
  convertUTCtoLocalTime,
  convertJSDateToMysqlDateTime,
} from "../../utilities/formatDate";
interface Props {
  customerReservationsInfo: CustomerReservation[];
  children?: React.ReactNode;
}

const CustomerBooking: React.FC<Props> = (props) => {
  const { customerReservationsInfo } = props;
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <>
      {customerReservationsInfo.map((element) => (
        <tr key={element.reservation_id}>
          <td>{element.reservation_id}</td>
          <td>
            {convertJSDateToMysqlDateTime(
              convertUTCtoLocalTime(
                convertMysqlDateTimeToIsoString(element.reservation_date),
                userTimeZone
              )
            )}
          </td>
          <td>{element.pickup_date}</td>
          <td>{element.return_date}</td>
          <td>{element.total_amount}</td>
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
