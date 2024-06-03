import PickupLocation from "../../../entities/pickupLocationEntity";
import classes from "./LocationInfo.module.css";
import { Link } from "react-router-dom";
import ReturnLocation from "../../../entities/returnLocationEntity";
interface Props {
  locations: PickupLocation[] | ReturnLocation[];
  children?: React.ReactNode;
}

const LocationInfo: React.FC<Props> = (props) => {
  const { locations } = props;
  return (
    <>
      {locations.map((element) => (
        <tr key={element.id}>
          <td>{element.id}</td>
          <td>{element.country}</td>
          <td>{element.city}</td>
          <td>{element.address}</td>
          <td>
            <Link to={`${element.id}/edit`} className={classes["table-action"]}>
              edit
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
};

export default LocationInfo;
