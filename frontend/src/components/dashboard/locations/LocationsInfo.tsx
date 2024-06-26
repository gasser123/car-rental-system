import PickupLocation from "../../../entities/pickupLocationEntity";
import Table from "../../UI/Table";
import LocationInfo from "./LocationInfo";
import ReturnLocation from "../../../entities/returnLocationEntity";
import classes from "./LocationsInfo.module.css";
import { Form } from "react-router-dom";
import SearchBar from "../../UI/SearchBar";
interface Props {
  locations: PickupLocation[] | ReturnLocation[] | null;
  children?: React.ReactNode;
}
const LocationsInfo: React.FC<Props> = (props) => {
  const { locations } = props;
  return locations ? (
    <div className={classes["dashboard-main"]}>
      <Form method="GET">
        <SearchBar />
      </Form>
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Country</th>
          <th>City</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <LocationInfo locations={locations} />
      </tbody>
    </Table>
    </div>
  ) : (
    <h2 style={{ textAlign: "center", margin: "0 auto" }}>
      No locations found at the moment
    </h2>
  );
};

export default LocationsInfo;
