import classes from "./InfoForm.module.css";
import PickupLocation from "../entities/pickupLocationEntity";
import ReturnLocation from "../entities/returnLocationEntity";
import { useState, useRef, useEffect } from "react";
import ReservationValidator from "../validations/ReservationValidator";
import CarValidator from "../validations/CarValidator";
import LocationValidator from "../validations/LocationValidator";
import circleXmark from "../assets/circle-xmark-solid.svg";
import { Form } from "react-router-dom";
import Countries from "../entities/Countries";
import isArrayOfPickupLocations from "../validations/pickuplocationResponseValidation";
import isArrayOfReturnLocations from "../validations/returnLocationResponseValidation";
const reservationValidator = new ReservationValidator();
const carValidator = new CarValidator();
const locationValidator = new LocationValidator();

interface Props {
  countries: { country: string }[] | null;
}
const InfoForm: React.FC<Props> = (props) => {
  const countries: Countries = props.countries;
  const [pickupLocations, setPickupLocations] = useState<
    PickupLocation[] | null
  >(null);
  const [returnLocations, setReturnLocations] = useState<
    ReturnLocation[] | null
  >(null);
  const [pickupLocationsState, setPickupLocationsState] = useState<
    PickupLocation[] | null
  >(null);
  const [returnLocationsState, setReturnLocationsState] = useState<
    ReturnLocation[] | null
  >(null);
  const [pickupInput, setPickupInput] = useState<string>("");
  const [returnInput, setReturnInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const pickupDateRef = useRef<HTMLInputElement>(null);
  const returnDateRef = useRef<HTMLInputElement>(null);
  const [countryChanged, setCountryChanged] = useState(countryRef.current?.value);
  useEffect(() => {
    async function fetchPickupLocations() {
      const country = countryRef.current?.value;
      const url = `http://localhost:8080/pickuplocations?country=${country}`;
      const response = await fetch(url);
      const responseData = await response.json();
      if (isArrayOfPickupLocations(responseData)) {
        setPickupLocations(responseData);
      }
    }

    async function fetchReturnLocations() {
      const country = countryRef.current?.value;
      const url = `http://localhost:8080/returnlocations?country=${country}`;
      const response = await fetch(url);
      const responseData = await response.json();
      if (isArrayOfReturnLocations(responseData)) {
        setReturnLocations(responseData);
      }
    }
    fetchPickupLocations();
    fetchReturnLocations();
  }, [countryChanged]);

  const filterPickupResults = (value: string): PickupLocation[] | null => {
    if (pickupLocations) {
      const countryValue = countryRef.current?.value;
      if (countryValue === undefined) {
        return null;
      }
      const results = pickupLocations.filter(
        (element) =>
          element.country.toLowerCase() === countryValue.toLowerCase() &&
          (element.address.toLowerCase().includes(value.toLowerCase()) ||
            element.city.toLowerCase().includes(value.toLowerCase()) ||
            element.country.toLowerCase().includes(value.toLowerCase()))
      );

      if (results.length === 0) {
        return null;
      }
      return results;
    }
    return null;
  };

  const filterReturnResults = (value: string): PickupLocation[] | null => {
    if (returnLocations) {
      const countryValue = countryRef.current?.value;
      if (countryValue === undefined) {
        return null;
      }
      const results = returnLocations.filter(
        (element) =>
          element.country.toLowerCase() === countryValue.toLowerCase() &&
          (element.address.toLowerCase().includes(value.toLowerCase()) ||
            element.city.toLowerCase().includes(value.toLowerCase()) ||
            element.country.toLowerCase().includes(value.toLowerCase()))
      );
      if (results.length === 0) {
        return null;
      }
      return results;
    }
    return null;
  };

  const locationsOnFocusHandler: React.FocusEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.currentTarget.id === "pickupLocation") {
      const countryValue = countryRef.current?.value;
      if (countryValue === undefined) {
        return;
      }
      const locations = pickupLocations
        ? pickupLocations.filter(
            (element) =>
              element.country.toLowerCase() === countryValue.toLowerCase()
          )
        : null;
      setPickupLocationsState(locations);
    } else if (event.currentTarget.id === "returnLocation") {
      const countryValue = countryRef.current?.value;
      if (countryValue === undefined) {
        return;
      }
      const locations = returnLocations
        ? returnLocations.filter(
            (element) =>
              element.country.toLowerCase() === countryValue.toLowerCase()
          )
        : null;
      setReturnLocationsState(locations);
    }
  };

  const locationsOnMouseLeaveHandler: React.MouseEventHandler<
    HTMLDivElement
  > = (event) => {
    if (event.currentTarget.id === "pickup-group") {
      setPickupLocationsState(null);
    } else if (event.currentTarget.id === "return-group") {
      setReturnLocationsState(null);
    }
  };

  const locationsOnChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.currentTarget.id === "pickupLocation") {
      setPickupInput(event.currentTarget.value);
      const results = filterPickupResults(event.currentTarget.value);
      setPickupLocationsState(results);
    } else if (event.currentTarget.id === "returnLocation") {
      setReturnInput(event.currentTarget.value);
      const results = filterReturnResults(event.currentTarget.value);
      setReturnLocationsState(results);
    }
  };

  const pickupLocationPickHandler: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    let value = event.currentTarget.textContent;
    if (!value) {
      value = "";
    }
    setPickupInput(value);
    setPickupLocationsState(null);
  };
  const returnLocationPickHandler: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    let value = event.currentTarget.textContent;
    if (!value) {
      value = "";
    }
    setReturnInput(value);
    setReturnLocationsState(null);
  };

  const countryChangeHandler: React.ChangeEventHandler<
    HTMLSelectElement
  > = (event) => {
    setCountryChanged(event.currentTarget.value);
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    if (!pickupLocations || !returnLocations) {
      event.preventDefault();
      return;
    }
    const countryValue = countryRef.current?.value;
    const pickupLocationValue = pickupInput;
    const returnLocationValue = returnInput;
    const pickupDateValue = pickupDateRef.current?.value;
    const returnDateValue = returnDateRef.current?.value;

    const validateCountry = carValidator.validateCountry(countryValue);
    const validatePickupLocation =
      locationValidator.validateInput(pickupLocationValue);
    const validateReturnLocation =
      locationValidator.validateInput(returnLocationValue);
    const validatePickupDate =
      reservationValidator.validateDate(pickupDateValue);
    const validateReturnDate =
      reservationValidator.validateDate(returnDateValue);
    if (!validateCountry) {
      event.preventDefault();
      setError("invalid country");
      return;
    }

    if (!validatePickupLocation) {
      event.preventDefault();
      setError("invalid pickup location");
      return;
    }

    if (!validateReturnLocation) {
      event.preventDefault();
      setError("invalid return location");
      return;
    }

    if (!validatePickupDate) {
      event.preventDefault();
      setError("invalid pickup date");
      return;
    }

    if (!validateReturnDate) {
      event.preventDefault();
      setError("invalid return date");
      return;
    }

    const validatePickupReturn = reservationValidator.validatePickupReturnDates(
      pickupDateValue!,
      returnDateValue!
    );
    if (!validatePickupReturn) {
      event.preventDefault();
      setError("Dates are not valid");
      return;
    }
    const pickupLocationInfo = pickupLocationValue.split(", ");
    const pickupCity = pickupLocationInfo[0];
    const pickupAddress = pickupLocationInfo[1];
    const returnLocationInfo = returnLocationValue.split(", ");
    const returnCity = returnLocationInfo[0];
    const returnAddress = returnLocationInfo[1];

    const pickupLocationExists = pickupLocations.findIndex(
      (element) =>
        element.city === pickupCity && element.address === pickupAddress
    );
    if (pickupLocationExists === -1) {
      event.preventDefault();
      setError("invalid pickup location");
      return;
    }

    const returnLocationExists = returnLocations.findIndex(
      (element) =>
        element.city === returnCity && element.address === returnAddress
    );
    if (returnLocationExists === -1) {
      event.preventDefault();
      setError("invalid return location");
      return;
    }

    if (pickupLocations[pickupLocationExists].country !== countryValue) {
      event.preventDefault();
      setError("invalid pickup location");
      return;
    }

    if (returnLocations[returnLocationExists].country !== countryValue) {
      event.preventDefault();
      setError("invalid return location");
      return;
    }

    setError(null);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes["form-container"]}>
        {error ? (
          <h3>
            <img src={circleXmark} alt="wrong" />
            {error}
          </h3>
        ) : null}
        <Form method="GET" className={classes.card} onSubmit={submitHandler}>
          <div className={classes["input-group"]}>
            <label htmlFor="countries">Pick country</label>
            <select name="country" id="countries" ref={countryRef} onChange={countryChangeHandler}>
              {countries
                ? countries.map((element) => (
                    <option key={element.country} value={element.country}>
                      {element.country}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div
            className={classes["input-group"]}
            id="pickup-group"
            onMouseLeave={locationsOnMouseLeaveHandler}
          >
            <label htmlFor="pickupLocation">Pickup location</label>
            <input
              name="pickupLocation"
              id="pickupLocation"
              type="text"
              onFocus={locationsOnFocusHandler}
              onChange={locationsOnChangeHandler}
              value={pickupInput}
            />
            {pickupLocationsState ? (
              <div className={classes["locations-list"]}>
                {pickupLocationsState.map((element) => (
                  <div
                    key={element.id}
                    className={classes["location-item"]}
                    onClick={pickupLocationPickHandler}
                  >{`${element.city}, ${element.address}`}</div>
                ))}
              </div>
            ) : null}
          </div>
          <div
            className={classes["input-group"]}
            id="return-group"
            onMouseLeave={locationsOnMouseLeaveHandler}
          >
            <label htmlFor="returnLocation">Return location</label>
            <input
              name="returnLocation"
              id="returnLocation"
              type="text"
              onFocus={locationsOnFocusHandler}
              onChange={locationsOnChangeHandler}
              value={returnInput}
            />
            {returnLocationsState ? (
              <div className={classes["locations-list"]}>
                {returnLocationsState.map((element) => (
                  <div
                    key={element.id}
                    className={classes["location-item"]}
                    onClick={returnLocationPickHandler}
                  >{`${element.city}, ${element.address}`}</div>
                ))}
              </div>
            ) : null}
          </div>
          <div className={classes["input-group"]}>
            <label htmlFor="pickupDate">Pickup date</label>
            <input
              name="pickupDate"
              id="pickupDate"
              type="datetime-local"
              ref={pickupDateRef}
            />
          </div>
          <div className={classes["input-group"]}>
            <label htmlFor="returnDate">Return date</label>
            <input
              name="returnDate"
              id="returnDate"
              type="datetime-local"
              ref={returnDateRef}
            />
          </div>
          <button type="submit" className={classes.action}>
            Show cars
          </button>
        </Form>
      </div>
    </div>
  );
};

export default InfoForm;
