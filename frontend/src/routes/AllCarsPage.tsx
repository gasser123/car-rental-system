import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import Car from "../entities/carEntity";
import isArrayOfCars from "../validations/carResponseValidations";
import CarsInfo from "../components/dashboard/cars/CarsInfo";
function AllCarsPage() {
  const data = useLoaderData();
  let cars: Car[] | null = null;
  if (isArrayOfCars(data)) {
    cars = data;
  }
  return <CarsInfo cars={cars} />;
}

export const loader: LoaderFunction = async () => {
  const url = "http://localhost:8080/cars";
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const resData = await response.json();
  if (!response.ok) {
    throw json(
      { message: resData ? resData : response.statusText },
      { status: response.status }
    );
  }

  return resData;
};

export default AllCarsPage;
