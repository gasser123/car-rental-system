import Car from "../../../entities/carEntity";
import Table from "../../UI/Table";
import CarInfo from "./CarInfo";
interface Props {
  cars: Car[] | null;
  children?: React.ReactNode;
}
const CarsInfo: React.FC<Props> = (props) => {
  const { cars } = props;
  return cars ? (
    <Table>
      <thead>
        <tr>
          <th>id</th>
          <th>plate id</th>
          <th>country</th>
          <th>model</th>
          <th>year</th>
          <th>color</th>
          <th>price per day</th>
          <th>status</th>
          <th>image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <CarInfo cars={cars} />
      </tbody>
    </Table>
  ) : (
    <h2 style={{ textAlign: "center", margin: "0 auto" }}>
      No cars found at the moment
    </h2>
  );
};

export default CarsInfo;