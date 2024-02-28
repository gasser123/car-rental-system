import classes from "./InfoForm.module.css";
import PickupLocation from "../entities/pickupLocationEntity";
import ReturnLocation from "../entities/returnLocationEntity";
import { useState, useRef } from "react";
import ReservationValidator from "../validations/ReservationValidator";
import CarValidator from "../validations/CarValidator";
import LocationValidator from "../validations/LocationValidator";
import circleXmark from "../assets/circle-xmark-solid.svg";
const reservationValidator = new ReservationValidator();
const carValidator = new CarValidator();
const locationValidator = new LocationValidator();
type Countries = { country: string }[] | null;
const countries: Countries = [
  { country: "Egypt" },
  { country: "Canada" },
  { country: "France" },
  { country: "Turkey" },
  { country: "UAE" },
];
const pickupLocations: PickupLocation[] = [
  { id: 1, country: "Egypt", city: "Alexandria", address: "Mandara" },
  { id: 2, country: "Egypt", city: "Cairo", address: "Zamalek" },
  { id: 3, country: "Canada", city: "Ontario", address: "Sekoseko" },
  { id: 4, country: "France", city: "Paris", address: "Eiffel" },
  { id: 5, country: "Turkey", city: "Istanbul", address: "Bekobeko" },
  { id: 6, country: "UAE", city: "Dubai", address: "Airport" },
];
const returnLocations: ReturnLocation[] = [
  { id: 1, country: "Egypt", city: "Alexandria", address: "Mandara" },
  { id: 2, country: "Egypt", city: "Cairo", address: "Zamalek" },
  { id: 3, country: "Canada", city: "Ontario", address: "Sekoseko" },
  { id: 4, country: "France", city: "Paris", address: "Eiffel" },
  { id: 5, country: "Turkey", city: "Istanbul", address: "Bekobeko" },
  { id: 6, country: "UAE", city: "Dubai", address: "Airport" },
];

function InfoForm() {
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

  const filterPickupResults = (value: string): PickupLocation[] | null => {
    if (pickupLocations) {
      const results = pickupLocations.filter(
        (element) =>
          element.address.toLowerCase().includes(value.toLowerCase()) ||
          element.city.toLowerCase().includes(value.toLowerCase()) ||
          element.country.toLowerCase().includes(value.toLowerCase())
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
      const results = returnLocations.filter(
        (element) =>
          element.address.toLowerCase().includes(value.toLowerCase()) ||
          element.city.toLowerCase().includes(value.toLowerCase()) ||
          element.country.toLowerCase().includes(value.toLowerCase())
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
      setPickupLocationsState(pickupLocations);
    } else if (event.currentTarget.id === "returnLocation") {
      setReturnLocationsState(returnLocations);
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

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
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
      setError("invalid country");
      return;
    }

    if (!validatePickupLocation) {
      setError("invalid pickup location");
      return;
    }

    if (!validateReturnLocation) {
      setError("invalid return location");
      return;
    }

    if (!validatePickupDate) {
      setError("invalid pickup date");
      return;
    }

    if (!validateReturnDate) {
      setError("invalid return date");
      return;
    }

    const validatePickupReturn = reservationValidator.validatePickupReturnDates(
      pickupDateValue!,
      returnDateValue!
    );
    if (!validatePickupReturn) {
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
      setError("invalid pickup location");
      return;
    }

    const returnLocationExists = returnLocations.findIndex(
      (element) =>
        element.city === returnCity && element.address === returnAddress
    );
    if (returnLocationExists === -1) {
      setError("invalid return location");
      return;
    }

    if (pickupLocations[pickupLocationExists].country !== countryValue) {
      setError("invalid pickup location");
      return;
    }

    if (returnLocations[returnLocationExists].country !== countryValue) {
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
        <form className={classes.card} onSubmit={submitHandler}>
          <div className={classes["input-group"]}>
            <label htmlFor="countries">Pick country</label>
            <select name="country" id="countries" ref={countryRef}>
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
        </form>
      </div>
    </div>
  );
}

export default InfoForm;
