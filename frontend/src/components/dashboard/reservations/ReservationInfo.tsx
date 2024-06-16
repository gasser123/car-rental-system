import AdminReservationInfo from "../../../entities/AdminReservationInfo";
import { formatDate } from "../../../utilities/formatDate";
import { useFetcher } from "react-router-dom";
import classes from "./ReservationInfo.module.css";
interface Props {
  adminReservationsInfo: AdminReservationInfo[];
  confirm?: boolean;
  children?: React.ReactNode;
}

const ReservationInfo: React.FC<Props> = (props) => {
  const { adminReservationsInfo, confirm } = props;
  const confirmFetcher = useFetcher();
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
          <td>{formatDate(new Date(element.reservation_date))}</td>
          <td>{formatDate(new Date(element.pickup_date))}</td>
          <td>{formatDate(new Date(element.return_date))}</td>
          <td>{`$${element.total_amount}`}</td>
          <td>
            {!confirm ? (
              element.confirmed ? (
                "confirmed"
              ) : (
                "not confirmed"
              )
            ) : (
              <confirmFetcher.Form
                method="PATCH"
                action={`${element.reservation_id}/confirm`}
              >
                <button
                  type="submit"
                  className={classes["table-action-confirm"]}
                >
                  confirm
                </button>
              </confirmFetcher.Form>
            )}
          </td>
        </tr>
      ))}
    </>
  );
};

export default ReservationInfo;
