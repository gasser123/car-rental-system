import PickupLocation from "../../../entities/pickupLocationEntity";
import Table from "../../UI/Table";
import LocationInfo from "./LocationInfo";
interface Props {
  locations: PickupLocation[] | null;
  children?: React.ReactNode;
}
const LocationsInfo: React.FC<Props> = (props) => {
  const { locations } = props;
  return locations ? (
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
  ) : (
    <h2 style={{ textAlign: "center", margin: "0 auto" }}>
      No locations found at the moment
    </h2>
  );
};

export default LocationsInfo;