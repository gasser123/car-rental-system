import Car from "../../entities/carEntity";
import classes from "./CarsData.module.css";
import CarData from "./CarData";
interface Props {
  cars: Car[] | null;
  children?: React.ReactNode;
}
const CarsData: React.FC<Props> = (props) => {
  const { cars } = props;
  return cars ? (
    <div className={classes["cars-container"]}>
      {cars.map((element) => (
        <CarData key={element.id} car={element} />
      ))}
    </div>
  ) : (
    <h2>No available Cars at the moment</h2>
  );
};

export default CarsData;
