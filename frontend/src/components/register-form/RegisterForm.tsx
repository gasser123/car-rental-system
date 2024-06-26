import { Form, useNavigation, useActionData } from "react-router-dom";
import classes from "./RegisterForm.module.css";
import Validator from "../../validations/Validator";
import { useState, useRef } from "react";
import FormErrorResponse from "../../entities/FormErrorResponse";
import circleXmark from "../../assets/circle-xmark-solid.svg";
import Spinner from "../UI/Spinner";
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
  const navigation = useNavigation();
  const responseData = useActionData();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const licenseRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const isSubmitting = navigation.state === "submitting";
  const validator = new Validator();
  const inputFormErrorExists: boolean =
    inputError.driver_license_no !== null ||
    inputError.email !== null ||
    inputError.first_name !== null ||
    inputError.last_name !== null ||
    inputError.mobile_no !== null ||
    inputError.password !== null
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
    if (name === "email") {
      const validate = validator.validateEmail(value);
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          email: !validate ? "invalid email" : null,
        };
        return newState;
      });
    } else if (name === "password") {
      const validate = validator.validatePassword(value);

      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          password: !validate
            ? `password should be at least 8 characters - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number - Can contain special characters`
            : null,
        };
        return newState;
      });
    } else if (name === "first_name") {
      const validate = validator.validateName(value);

      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          first_name: !validate ? "invalid name" : null,
        };
        return newState;
      });
    } else if (name === "last_name") {
      const validate = validator.validateName(value);

      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          last_name: !validate ? "invalid name" : null,
        };
        return newState;
      });
    } else if (name === "driver_license_no") {
      const validate = validator.validateLicense(value);

      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          driver_license_no: !validate ? "invalid license" : null,
        };
        return newState;
      });
    } else if (name === "mobile_no") {
      const validate = validator.validateMobileNo(value);

      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          mobile_no: !validate ? "invalid mobile number" : null,
        };
        return newState;
      });
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
          email: "",
        };
        return newState;
      });
    } else if (name === "password") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          password: "",
        };
        return newState;
      });
    } else if (name === "first_name") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          first_name: "",
        };
        return newState;
      });
    } else if (name === "last_name") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          last_name: "",
        };
        return newState;
      });
    } else if (name === "driver_license_no") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          driver_license_no: "",
        };
        return newState;
      });
    } else if (name === "mobile_no") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          mobile_no: "",
        };
        return newState;
      });
    }
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    const email = emailRef.current?.value!;
    const password = passwordRef.current?.value!;
    const first_name = firstNameRef.current?.value!;
    const last_name = lastNameRef.current?.value!;
    const license = licenseRef.current?.value!;
    const mobile = mobileRef.current?.value!;

    const validateEmail = validator.validateEmail(email);
    const validatePassword = validator.validatePassword(password);
    const validateFirstName = validator.validateName(first_name);
    const validateLastName = validator.validateName(last_name);
    const validateLicense = validator.validateLicense(license);
    const validateMobile = validator.validateMobileNo(mobile);

    if (!validateEmail) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          email: "invalid email",
        };
        return newState;
      });
    }

    if (!validatePassword) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          password: `password should be at least 8 characters - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number - Can contain special characters`,
        };
        return newState;
      });
    }

    if (!validateFirstName) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          first_name: "invalid name",
        };
        return newState;
      });
    }

    if (!validateLastName) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          last_name: "invalid name",
        };
        return newState;
      });
    }

    if (!validateLicense) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          driver_license_no: "invalid license",
        };
        return newState;
      });
    }

    if (!validateMobile) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          mobile_no: "invalid mobile number",
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
      <Form
        method="POST"
        className={classes["register-form"]}
        onSubmit={onSubmitHandler}
      >
        {formErrorMessage ? (
          <h3>
            <img src={circleXmark} alt="wrong" />
            {formErrorMessage.errorMessage}
          </h3>
        ) : null}
        <div className={classes["input-group"]}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onBlur={inputOnBlurHandler}
            className={inputError.email ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            ref={emailRef}
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
            ref={passwordRef}
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
            ref={firstNameRef}
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
            ref={lastNameRef}
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
            ref={licenseRef}
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
            ref={mobileRef}
          />
          {mobile_noError}
        </div>
        <button
          type="submit"
          className={classes.action}
          disabled={isSubmitting || inputFormErrorExists}
        >
          {isSubmitting ? <Spinner /> : "Register"}
        </button>
      </Form>
    </div>
  );
}

export default RegisterForm;
