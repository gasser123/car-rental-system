import Car from "../../entities/carEntity";
import classes from "./CarData.module.css";
import { daysBetweenDates } from "../../utilities/calculations";
import { useSearchParams } from "react-router-dom";
interface Props {
  car: Car;
  children?: React.ReactNode;
}
const CarData: React.FC<Props> = (props) => {
  const { car } = props;
  const [searchParams] = useSearchParams();
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");
  let totalAmount: number | null = null;
  if (pickupDate && returnDate) {
    const daysDifference = daysBetweenDates(pickupDate, returnDate);
    totalAmount = car.price_per_day * daysDifference;
  }

  return (
    <div className={classes["car-container"]}>
      <img src={car.image_url} alt="car" className={classes["car-img"]} />
      <div className={classes.info}>
        <p>
          Model: <span className={classes.data}>{car.model}</span>
        </p>
        <p>
          Year: <span className={classes.data}>{car.year}</span>
        </p>
        <p>
          Color: <span className={classes.data}>{car.color}</span>
        </p>
        <p>
          Status:{" "}
          <span
            className={
              car.status === "Available"
                ? classes.available
                : classes.unavailable
            }
          >
            {car.status}
          </span>
        </p>
        <h3>
          Total amount:{" "}
          <span className={classes.data}>{`$${totalAmount}`}</span>
        </h3>
      </div>
    </div>
  );
};

export default CarData;
