import { Form, useNavigation, useActionData } from "react-router-dom";
import classes from "./AddLocation.module.css";
import LocationValidator from "../../../validations/LocationValidator";
import { useState, useRef } from "react";
import FormErrorResponse from "../../../entities/FormErrorResponse";
import circleXmark from "../../../assets/circle-xmark-solid.svg";
import Spinner from "../../UI/Spinner";
type InputError = {
  country: string | null;
  city: string | null;
  address: string | null;
};
const initialInputError: InputError = {
  country: null,
  city: null,
  address: null,
};
function AddLocation() {
  const [inputError, setInputError] = useState<InputError>(initialInputError);
  const navigation = useNavigation();
  const responseData = useActionData();
  const countryRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const isSubmitting = navigation.state === "submitting";
  const locationValidator = new LocationValidator();
  const inputFormErrorExists: boolean =
    inputError.country !== null ||
    inputError.city !== null ||
    inputError.address !== null
      ? true
      : false;
  let formErrorMessage: FormErrorResponse | null = null;
  if (
    responseData &&
    typeof responseData === "object" &&
    "status" in responseData &&
    "errorMessage" in responseData &&
    typeof responseData.status === "number" &&
    typeof responseData.errorMessage === "string"
  ) {
    formErrorMessage = {
      status: responseData.status,
      errorMessage: responseData.errorMessage,
    };
  }
  const inputOnBlurHandler: React.FocusEventHandler<HTMLInputElement> = (
    event
  ) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    if (name === "country") {
      const validate = locationValidator.validateInput(value);
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          country: !validate ? "invalid value" : null,
        };
        return newState;
      });
    } else if (name === "city") {
      const validate = locationValidator.validateInput(value);

      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          city: !validate ? `invalid value` : null,
        };
        return newState;
      });
    } else if (name === "address") {
      const validate = locationValidator.validateInput(value);

      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          address: !validate ? "invalid value" : null,
        };
        return newState;
      });
    }
  };
  const inputOnChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const name = event.currentTarget.name;
    if (name === "country") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          country: "",
        };
        return newState;
      });
    } else if (name === "city") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          city: "",
        };
        return newState;
      });
    } else if (name === "address") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          address: "",
        };
        return newState;
      });
    }
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    const country = countryRef.current?.value!;
    const city = cityRef.current?.value!;
    const address = addressRef.current?.value!;

    const validateCountry = locationValidator.validateInput(country);
    const validateCity = locationValidator.validateInput(city);
    const validateAddress = locationValidator.validateInput(address);

    if (!validateCountry) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          country: "invalid value",
        };
        return newState;
      });
    }

    if (!validateCity) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          city: "invalid value",
        };
        return newState;
      });
    }

    if (!validateAddress) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          address: "invalid value",
        };
        return newState;
      });
    }
  };

  const countryError = inputError.country ? (
    <p className={classes.error}>{inputError.country}</p>
  ) : null;
  const cityError = inputError.city ? (
    <p className={classes.error}>{inputError.city}</p>
  ) : null;
  const addressError = inputError.address ? (
    <p className={classes.error}>{inputError.address}</p>
  ) : null;

  return (
    <div className={classes["form-container"]}>
      <Form
        method="POST"
        className={classes["location-form"]}
        onSubmit={onSubmitHandler}
      >
        {formErrorMessage ? (
          <h3>
            <img src={circleXmark} alt="wrong" />
            {formErrorMessage.errorMessage}
          </h3>
        ) : null}
        <div className={classes["input-group"]}>
          <label>Country</label>
          <input
            type="text"
            name="country"
            onBlur={inputOnBlurHandler}
            className={inputError.country ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            ref={countryRef}
          />
          {countryError}
        </div>
        <div className={classes["input-group"]}>
          <label>City</label>
          <input
            type="text"
            name="city"
            onBlur={inputOnBlurHandler}
            className={inputError.city ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            ref={cityRef}
          />
          {cityError}
        </div>
        <div className={classes["input-group"]}>
          <label>Address</label>
          <input
            type="text"
            name="address"
            onBlur={inputOnBlurHandler}
            className={inputError.address ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            ref={addressRef}
          />
          {addressError}
        </div>

        <button
          type="submit"
          className={classes.action}
          disabled={isSubmitting || inputFormErrorExists}
        >
          {isSubmitting ? <Spinner /> : "Add location"}
        </button>
      </Form>
    </div>
  );
}

export default AddLocation;
