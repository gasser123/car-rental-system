import ReservationLoaderResponse from "../../entities/ReservationLoaderResponse";
import classes from "./ReservationInfo.module.css";
import { useSearchParams } from "react-router-dom";
import { daysBetweenDates } from "../../utilities/calculations";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utilities/formatDate";
interface Props {
  reservationLoaderData: ReservationLoaderResponse;
}

const ReservationInfo: React.FC<Props> = (props) => {
  const { pickupLocation, returnLocation, car } = props.reservationLoaderData;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");
  let totalAmount: number | null = null;
  if (pickupDate && returnDate) {
    const daysDifference = daysBetweenDates(pickupDate, returnDate);
    totalAmount = car.price_per_day * daysDifference;
  }

  const pickupDateObject = new Date(pickupDate as string);
  const returnDateObject = new Date(returnDate as string); 
  const pickupDateValue = formatDate(pickupDateObject);
  const returnDateValue = formatDate(returnDateObject);

  const cancelClickHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate(-1);
  };
  return (
    <div className={classes.container}>
      <h2>Reservation details</h2>
      <div className={classes["info-group"]}>
        <h4>Country:</h4>
        <p>{pickupLocation.country}</p>
      </div>
      <div className={classes["info-group"]}>
        <h4>Car model:</h4>
        <p>{car.model}</p>
      </div>
      <div className={classes["info-group"]}>
        <h4>Car model year:</h4>
        <p>{car.year}</p>
      </div>
      <div className={classes["info-group"]}>
        <h4>Car color:</h4>
        <p>{car.color}</p>
      </div>
      <div className={classes["info-group"]}>
        <h4>Pickup location city:</h4>
        <p>{pickupLocation.city}</p>
      </div>
      <div className={classes["info-group"]}>
        <h4>Pickup loaction address:</h4>
        <p>{pickupLocation.address}</p>
      </div>
      <div className={classes["info-group"]}>
        <h4>Return location city:</h4>
        <p>{returnLocation.city}</p>
      </div>
      <div className={classes["info-group"]}>
        <h4>Return location address:</h4>
        <p>{returnLocation.address}</p>
      </div>
      <div className={classes["info-group"]}>
        <h4>Pickup date:</h4>
        <p>{pickupDateValue}</p>
      </div>
      <div className={classes["info-group"]}>
        <h4>Return date:</h4>
        <p>{returnDateValue}</p>
      </div>

      <h3>{`Total Amount: $${totalAmount}`}</h3>
      <div className={classes.actions}>
        <button type="button" className={classes.cancel} onClick={cancelClickHandler}>
          Cancel
        </button>
        <button type="button" className={classes.confirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ReservationInfo;
