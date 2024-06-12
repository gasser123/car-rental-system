import ReservationValidator from "../validations/ReservationValidator";
import CarValidator from "../validations/CarValidator";
import LocationValidator from "../validations/LocationValidator";
import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import ReservationInfo from "../components/reservation/ReservationInfo";
import isReservationLoaderResponse from "../validations/ReservationLoaderResponseValidation";
import ReservationLoaderResponse from "../entities/ReservationLoaderResponse";
const reservationValidator = new ReservationValidator();
const carValidator = new CarValidator();
const locationValidator = new LocationValidator();
function ReservationPage() {
  const data = useLoaderData();
  let reservationLoaderData: ReservationLoaderResponse | null = null;
  if (isReservationLoaderResponse(data)) {
    reservationLoaderData = data;
  }
  return reservationLoaderData ? (
    <ReservationInfo reservationLoaderData={reservationLoaderData} />
  ) : (
    <></>
  );
}

export default ReservationPage;

export const loader: LoaderFunction = async (loaderArgs) => {
  const { request } = loaderArgs;
  const requestURL = new URL(request.url);
  const countryValue = requestURL.searchParams.get("country");
  const pickupLocationValue = requestURL.searchParams.get("pickupLocation");
  const returnLocationValue = requestURL.searchParams.get("returnLocation");
  const pickupDateValue = requestURL.searchParams.get("pickupDate");
  const returnDateValue = requestURL.searchParams.get("returnDate");
  const carID = requestURL.searchParams.get("carid");

  const validateCountry = carValidator.validateCountry(countryValue);
  const validatePickupLocation =
    locationValidator.validateInput(pickupLocationValue);
  const validateReturnLocation =
    locationValidator.validateInput(returnLocationValue);
  const validatePickupDate = reservationValidator.validateDate(pickupDateValue);
  const validateReturnDate = reservationValidator.validateDate(returnDateValue);
  const validateCarID = carID && parseInt(carID) ? true : false;
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

  if (!validateCarID) {
    throw json({ message: "invalid car id" }, { status: 422 });
  }
  const pickupValue = pickupLocationValue as string;
  const returnValue = returnLocationValue as string;
  const pickupCity = pickupValue.split(", ")[0];
  const returnCity = returnValue.split(", ")[0];
  const pickupAddress = pickupValue
    .split(", ")
    .filter((element, index) => index !== 0)
    .join(", ");
  const returnAddress = returnValue
    .split(", ")
    .filter((element, index) => index !== 0)
    .join(", ");

  const pickupURL = `http://localhost:8080/pickuplocation-id?country=${countryValue}&city=${pickupCity}&address=${pickupAddress}`;
  const returnURL = `http://localhost:8080/returnlocation-id?country=${countryValue}&city=${returnCity}&address=${returnAddress}`;
  const pickupResponse = await fetch(pickupURL);
  const pickupResponseData = await pickupResponse.json();
  if (!pickupResponse.ok) {
    throw json(
      { message: pickupResponseData },
      { status: pickupResponse.status }
    );
  }
  const returnResponse = await fetch(returnURL);
  const returnResponseData = await returnResponse.json();
  if (!returnResponse.ok) {
    throw json(
      { message: returnResponseData },
      { status: returnResponse.status }
    );
  }

  const url = `http://localhost:8080/cars/${carID}`;
  const carResponse = await fetch(url);

  const resData = await carResponse.json();
  if (!carResponse.ok) {
    throw json(
      { message: resData ? resData : carResponse.statusText },
      { status: carResponse.status }
    );
  }

  return {
    pickupLocation: pickupResponseData,
    returnLocation: returnResponseData,
    car: resData,
  };
};
