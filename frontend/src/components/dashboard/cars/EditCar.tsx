import { Form, useNavigation, useActionData } from "react-router-dom";
import classes from "./EditCar.module.css";
import CarValidator from "../../../validations/CarValidator";
import { useState, useRef } from "react";
import FormErrorResponse from "../../../entities/FormErrorResponse";
import circleXmark from "../../../assets/circle-xmark-solid.svg";
import Spinner from "../../UI/Spinner";
import Car from "../../../entities/carEntity";

interface Props {
  car: Car;
  children?: React.ReactNode;
}

type InputError = {
  plate_id: string | null;
  model: string | null;
  year: string | null;
  status: string | null;
  price_per_day: string | null;
  country: string | null;
  color: string | null;
  image_url: string | null;
};
const initialInputError: InputError = {
  plate_id: null,
  model: null,
  year: null,
  status: null,
  price_per_day: null,
  country: null,
  color: null,
  image_url: null,
};
const EditCar: React.FC<Props> = (props) => {
  const car = props.car;  
  const [inputError, setInputError] = useState<InputError>(initialInputError);
  const navigation = useNavigation();
  const responseData = useActionData();
  const plate_idRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const price_per_dayRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const image_urlRef = useRef<HTMLInputElement>(null);
  const isSubmitting = navigation.state === "submitting";
  const carValidator = new CarValidator();
  const inputFormErrorExists: boolean =
    inputError.plate_id !== null ||
    inputError.model !== null ||
    inputError.color !== null ||
    inputError.country !== null ||
    inputError.price_per_day !== null ||
    inputError.status !== null ||
    inputError.year !== null ||
    inputError.image_url !== null
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
    if (name === "plate_id") {
      const validate = carValidator.validatePlate(value);
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          plate_id: !validate ? "invalid value" : null,
        };
        return newState;
      });
    } else if (name === "model") {
      const validate = carValidator.validateModel(value);

      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          model: !validate ? `invalid value` : null,
        };
        return newState;
      });
    } else if (name === "year") {
      const validate = carValidator.validateYear(value);

      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          year: !validate ? "invalid value" : null,
        };
        return newState;
      });
    } else if (name === "status") {
      const validate = carValidator.validateStatus(value);

      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          status: !validate ? "invalid status" : null,
        };
        return newState;
      });
    } else if (name === "price_per_day") {
      const price = parseFloat(value);
      const validate = carValidator.validatePrice(price);

      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          price_per_day: !validate ? "invalid price" : null,
        };
        return newState;
      });
    } else if (name === "country") {
      const validate = carValidator.validateCountry(value);

      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          country: !validate ? "invalid value" : null,
        };
        return newState;
      });
    } else if (name === "color") {
      const validate = carValidator.validateColor(value);

      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          color: !validate ? "invalid value" : null,
        };
        return newState;
      });
    } else if (name === "image_url") {
      const validate = carValidator.validateURL(value);

      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          image_url: !validate ? "invalid URL" : null,
        };
        return newState;
      });
    }
  };
  const inputOnChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const name = event.currentTarget.name;
    if (name === "plate_id") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          plate_id: "",
        };
        return newState;
      });
    } else if (name === "model") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          model: "",
        };
        return newState;
      });
    } else if (name === "year") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          year: "",
        };
        return newState;
      });
    } else if (name === "status") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          status: "",
        };
        return newState;
      });
    } else if (name === "price_per_day") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          price_per_day: "",
        };
        return newState;
      });
    } else if (name === "country") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          country: "",
        };
        return newState;
      });
    } else if (name === "color") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          color: "",
        };
        return newState;
      });
    } else if (name === "image_url") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          image_url: "",
        };
        return newState;
      });
    }
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    const plate_id = plate_idRef.current?.value!;
    const model = modelRef.current?.value!;
    const year = yearRef.current?.value!;
    const status = statusRef.current?.value!;
    const price_per_day = price_per_dayRef.current?.value!;
    const country = countryRef.current?.value!;
    const color = colorRef.current?.value!;
    const image_url = image_urlRef.current?.value!;
    const price = parseFloat(price_per_day);

    const validatePlate_id = carValidator.validatePlate(plate_id);
    const validateModel = carValidator.validateModel(model);
    const validateYear = carValidator.validateYear(year);
    const validateStatus = carValidator.validateStatus(status);
    const validatePrice = carValidator.validatePrice(price);
    const validateCountry = carValidator.validateCountry(country);
    const validateColor = carValidator.validateColor(color);
    const validateImageURL = carValidator.validateURL(image_url);

    if (!validatePlate_id) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          plate_id: "invalid email",
        };
        return newState;
      });
    }

    if (!validateModel) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          model: "invalid input",
        };
        return newState;
      });
    }

    if (!validateYear) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          year: "invalid input",
        };
        return newState;
      });
    }

    if (!validateStatus) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          status: "invalid input",
        };
        return newState;
      });
    }

    if (!validatePrice) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          price_per_day: "invalid input",
        };
        return newState;
      });
    }

    if (!validateCountry) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          country: "invalid input",
        };
        return newState;
      });
    }
    if (!validateColor) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          color: "invalid input",
        };
        return newState;
      });
    }
    if (!validateImageURL) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          image_url: "invalid URL",
        };
        return newState;
      });
    }
  };

  const plate_idError = inputError.plate_id ? (
    <p className={classes.error}>{inputError.plate_id}</p>
  ) : null;
  const modelError = inputError.model ? (
    <p className={classes.error}>{inputError.model}</p>
  ) : null;
  const yearError = inputError.year ? (
    <p className={classes.error}>{inputError.year}</p>
  ) : null;
  const statusError = inputError.status ? (
    <p className={classes.error}>{inputError.status}</p>
  ) : null;
  const priceError = inputError.price_per_day ? (
    <p className={classes.error}>{inputError.price_per_day}</p>
  ) : null;
  const countryError = inputError.country ? (
    <p className={classes.error}>{inputError.country}</p>
  ) : null;
  const colorError = inputError.color ? (
    <p className={classes.error}>{inputError.color}</p>
  ) : null;
  const imageURLError = inputError.image_url ? (
    <p className={classes.error}>{inputError.image_url}</p>
  ) : null;

  return (
    <div className={classes["form-container"]}>
      <Form
        method="PATCH"
        className={classes["car-form"]}
        onSubmit={onSubmitHandler}
      >
        {formErrorMessage ? (
          <h3>
            <img src={circleXmark} alt="wrong" />
            {formErrorMessage.errorMessage}
          </h3>
        ) : null}
        <div className={classes["input-group"]}>
          <label>Plate No</label>
          <input
            type="text"
            name="plate_id"
            onBlur={inputOnBlurHandler}
            className={inputError.plate_id ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            ref={plate_idRef}
            defaultValue={car.plate_id}
          />
          {plate_idError}
        </div>
        <div className={classes["input-group"]}>
          <label>Model</label>
          <input
            type="text"
            name="model"
            onBlur={inputOnBlurHandler}
            className={inputError.model ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            ref={modelRef}
            defaultValue={car.model}
          />
          {modelError}
        </div>
        <div className={classes["input-group"]}>
          <label>Year</label>
          <input
            type="text"
            name="year"
            onBlur={inputOnBlurHandler}
            className={inputError.year ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            ref={yearRef}
            defaultValue={car.year}
          />
          {yearError}
        </div>
        <div className={classes["input-group"]}>
          <label>Status</label>
          <select name="status" defaultValue={car.status} ref={statusRef}>
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Out of service">Out of service</option>
          </select>
          {statusError}
        </div>
        <div className={classes["input-group"]}>
          <label>Price per day</label>
          <input
            type="number"
            name="price_per_day"
            onBlur={inputOnBlurHandler}
            className={inputError.price_per_day ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            ref={price_per_dayRef}
            defaultValue={car.price_per_day}
          />
          {priceError}
        </div>
        <div className={classes["input-group"]}>
          <label>Country</label>
          <input
            type="text"
            name="country"
            onBlur={inputOnBlurHandler}
            className={inputError.country ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            ref={countryRef}
            defaultValue={car.country}
          />
          {countryError}
        </div>
        <div className={classes["input-group"]}>
          <label>Color</label>
          <input
            type="text"
            name="color"
            onBlur={inputOnBlurHandler}
            className={inputError.color ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            ref={colorRef}
            defaultValue={car.color}
          />
          {colorError}
        </div>
        <div className={classes["input-group"]}>
          <label>Image url</label>
          <input
            type="text"
            name="image_url"
            onBlur={inputOnBlurHandler}
            className={inputError.image_url ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            ref={image_urlRef}
            defaultValue={car.image_url}
          />
          {imageURLError}
        </div>
        <button
          type="submit"
          className={classes.action}
          disabled={isSubmitting || inputFormErrorExists}
        >
          {isSubmitting ? <Spinner /> : "Update car"}
        </button>
      </Form>
    </div>
  );
};

export default EditCar;
