import Car from "../../../entities/carEntity";
import classes from "./CarInfo.module.css"
import { Link } from "react-router-dom";
interface Props {
  cars: Car[];
  children?: React.ReactNode;
}

const CarInfo: React.FC<Props> = (props) => {
  const { cars } = props;
  return (
    <>
      {cars.map((element) => (
        <tr key={element.id}>
          <td>{element.id}</td>  
          <td>{element.plate_id}</td>
          <td>{element.country}</td>
          <td>{element.model}</td>
          <td>{element.year}</td>
          <td>{element.color}</td>
          <td>{element.price_per_day}</td>
          <td>{element.status}</td>
          <td><img src={element.image_url} alt="car" className={classes["car-image"]} /></td>
          <td>
            <Link to={`${element.id}/edit`} className={classes["table-action"]}>edit</Link>
          </td>
        </tr>
      ))}
    </>
  );
};

export default CarInfo;