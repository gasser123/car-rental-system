import { Form } from "react-router-dom";
import classes from "./RegisterForm.module.css";
import Validator from "../../validations/Validator";
import { useState } from "react";
type InputError = {
  driver_license_no: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  password: string | null;
  mobile_no: string | null;
};
const initialInputError: InputError = {
  driver_license_no: null,
  email: null,
  first_name: null,
  last_name: null,
  mobile_no: null,
  password: null,
};
function RegisterForm() {
  const [inputError, setInputError] = useState<InputError>(initialInputError);
  const validator = new Validator();

  const inputOnBlurHandler: React.FocusEventHandler<HTMLInputElement> = (
    event
  ) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    if (name === "email") {
      const validate = validator.validateEmail(value);
      if (!validate) {
        setInputError((currentState) => {
          const newState: InputError = {
            ...currentState,
            email: "invalid email",
          };
          return newState;
        });
      }
    } else if (name === "password") {
      const validate = validator.validatePassword(value);
      if (!validate) {
        setInputError((currentState) => {
          const newState: InputError = {
            ...currentState,
            password: `password should be at least 8 characters - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number - Can contain special characters`,
          };
          return newState;
        });
      }
    } else if (name === "first_name") {
      const validate = validator.validateName(value);
      if (!validate) {
        setInputError((currentState) => {
          const newState: InputError = {
            ...currentState,
            first_name: "invalid name",
          };
          return newState;
        });
      }
    } else if (name === "last_name") {
      const validate = validator.validateName(value);
      if (!validate) {
        setInputError((currentState) => {
          const newState: InputError = {
            ...currentState,
            last_name: "invalid name",
          };
          return newState;
        });
      }
    } else if (name === "driver_license_no") {
      const validate = validator.validateLicense(value);
      if (!validate) {
        setInputError((currentState) => {
          const newState: InputError = {
            ...currentState,
            driver_license_no: "invalid license",
          };
          return newState;
        });
      }
    } else if (name === "mobile_no") {
      const validate = validator.validateMobileNo(value);
      if (!validate) {
        setInputError((currentState) => {
          const newState: InputError = {
            ...currentState,
            mobile_no: "invalid mobile number",
          };
          return newState;
        });
      }
    }
  };
  const inputOnChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const name = event.currentTarget.name;
    if (name === "email") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          email: null,
        };
        return newState;
      });
    } else if (name === "password") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          password: null,
        };
        return newState;
      });
    } else if (name === "first_name") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          first_name: null,
        };
        return newState;
      });
    } else if (name === "last_name") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          last_name: null,
        };
        return newState;
      });
    } else if (name === "driver_license_no") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          driver_license_no: null,
        };
        return newState;
      });
    } else if (name === "mobile_no") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          mobile_no: null,
        };
        return newState;
      });
    }
  };

  const emailError = inputError.email ? (
    <p className={classes.error}>{inputError.email}</p>
  ) : null;
  const passwordError = inputError.password ? (
    <p className={classes.error}>{inputError.password}</p>
  ) : null;
  const first_nameError = inputError.first_name ? (
    <p className={classes.error}>{inputError.first_name}</p>
  ) : null;
  const last_nameError = inputError.last_name ? (
    <p className={classes.error}>{inputError.last_name}</p>
  ) : null;
  const driver_license_noError = inputError.driver_license_no ? (
    <p className={classes.error}>{inputError.driver_license_no}</p>
  ) : null;
  const mobile_noError = inputError.mobile_no ? (
    <p className={classes.error}>{inputError.mobile_no}</p>
  ) : null;
  return (
    <div className={classes["form-container"]}>
      <Form method="POST" className={classes["register-form"]}>
        <div className={classes["input-group"]}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onBlur={inputOnBlurHandler}
            className={inputError.email ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
          />
          {emailError}
        </div>
        <div className={classes["input-group"]}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onBlur={inputOnBlurHandler}
            className={inputError.password ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
          />
          {passwordError}
        </div>
        <div className={classes["input-group"]}>
          <label>First name</label>
          <input
            type="text"
            name="first_name"
            onBlur={inputOnBlurHandler}
            className={inputError.first_name ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
          />
          {first_nameError}
        </div>
        <div className={classes["input-group"]}>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            onBlur={inputOnBlurHandler}
            className={inputError.last_name ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
          />
          {last_nameError}
        </div>
        <div className={classes["input-group"]}>
          <label>License no</label>
          <input
            type="text"
            name="driver_license_no"
            onBlur={inputOnBlurHandler}
            className={
              inputError.driver_license_no ? classes["input-error"] : ""
            }
            onChange={inputOnChangeHandler}
          />
          {driver_license_noError}
        </div>
        <div className={classes["input-group"]}>
          <label>Mobile no</label>
          <input
            type="text"
            name="mobile_no"
            onBlur={inputOnBlurHandler}
            className={inputError.mobile_no ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
          />
          {mobile_noError}
        </div>
        <button type="submit" className={classes.action}>
          Register
        </button>
      </Form>
    </div>
  );
}

export default RegisterForm;
