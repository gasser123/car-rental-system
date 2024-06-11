import { LoaderFunction, json, redirect, useLoaderData } from "react-router-dom";
import CarValidator from "../validations/CarValidator";
import ReservationValidator from "../validations/ReservationValidator";
import LocationValidator from "../validations/LocationValidator";
import CarsData from "../components/cars/CarsData";
import Car from "../entities/carEntity";
import isArrayOfCars from "../validations/carResponseValidations";
const reservationValidator = new ReservationValidator();
const carValidator = new CarValidator();
const locationValidator = new LocationValidator();
function CarsPage() {
  const data = useLoaderData();
  let cars: Car[] | null = null;
   if(isArrayOfCars(data)){
    cars = data;
   }
  return <CarsData cars={cars}/>;
}

export default CarsPage;

export const loader: LoaderFunction = async (loaderArgs) => {
  const { request } = loaderArgs;
  const requestURL = new URL(request.url);
  const countryValue = requestURL.searchParams.get("country");
  const pickupLocationValue = requestURL.searchParams.get("pickupLocation");
  const returnLocationValue = requestURL.searchParams.get("returnLocation");
  const pickupDateValue = requestURL.searchParams.get("pickupDate");
  const returnDateValue = requestURL.searchParams.get("returnDate");
  let availableOnly = requestURL.searchParams.get("availableOnly");
  if (!availableOnly) {
    availableOnly = "true";
    return redirect(`${request.url}&availableOnly=${availableOnly}`);
  }

  if (availableOnly !== "true" && availableOnly !== "false") {
    throw json({ message: "page not found" }, { status: 404 });
  }
  const validateCountry = carValidator.validateCountry(countryValue);
  const validatePickupLocation =
    locationValidator.validateInput(pickupLocationValue);
  const validateReturnLocation =
    locationValidator.validateInput(returnLocationValue);
  const validatePickupDate = reservationValidator.validateDate(pickupDateValue);
  const validateReturnDate = reservationValidator.validateDate(returnDateValue);
  if (!validateCountry) {
    throw json({ message: "invalid country" }, { status: 422 });
  }

  if (!validatePickupLocation) {
    throw json({ message: "invalid pickup location" }, { status: 422 });
  }

  if (!validateReturnLocation) {
    throw json({ message: "invalid return location" }, { status: 422 });
  }

  if (!validatePickupDate) {
    throw json({ message: "invalid pickup date" }, { status: 422 });
  }

  if (!validateReturnDate) {
    throw json({ message: "invalid return date" }, { status: 422 });
  }

  const validatePickupReturn = reservationValidator.validatePickupReturnDates(
    pickupDateValue!,
    returnDateValue!
  );
  if (!validatePickupReturn) {
    throw json({ message: "invalid dates" }, { status: 422 });
  }

  const url = `http://localhost:8080/customer-cars?country=${countryValue}&availableOnly=${availableOnly}`;
  const response = await fetch(url);
  const resData = await response.json();
  if (!response.ok) {
    throw json({ message: resData }, { status: response.status });
  }

  return resData;
};
