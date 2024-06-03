import { Form, useNavigation, useActionData } from "react-router-dom";
import classes from "./AddAdmin.module.css";
import Validator from "../../../validations/Validator";
import { useState, useRef } from "react";
import FormErrorResponse from "../../../entities/FormErrorResponse";
import circleXmark from "../../../assets/circle-xmark-solid.svg";
import Spinner from "../../UI/Spinner";
type InputError = {
  email: string | null;
  password: string | null;
  first_name: string | null;
  last_name: string | null;
};
const initialInputError: InputError = {
  email: null,
  password: null,
  first_name: null,
  last_name: null,
};
function AddAdmin() {
  const [inputError, setInputError] = useState<InputError>(initialInputError);
  const navigation = useNavigation();
  const responseData = useActionData();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const first_nameRef = useRef<HTMLInputElement>(null);
  const last_nameRef = useRef<HTMLInputElement>(null);
  const isSubmitting = navigation.state === "submitting";
  const adminValidator = new Validator();
  const inputFormErrorExists: boolean =
    inputError.email !== null ||
    inputError.password !== null ||
    inputError.first_name !== null ||
    inputError.last_name !== null
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
      const validate = adminValidator.validateEmail(value);
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          email: !validate ? "invalid value" : null,
        };
        return newState;
      });
    } else if (name === "password") {
      const validate = adminValidator.validatePassword(value);

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
      const validate = adminValidator.validateName(value);

      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          first_name: !validate ? "invalid value" : null,
        };
        return newState;
      });
    } else if (name === "last_name") {
      const validate = adminValidator.validateName(value);

      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          last_name: !validate ? "invalid value" : null,
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
    }
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    const email = emailRef.current?.value!;
    const password = passwordRef.current?.value!;
    const first_name = first_nameRef.current?.value!;
    const last_name = last_nameRef.current?.value!;

    const validateEmail = adminValidator.validateEmail(email);
    const validatePassword = adminValidator.validatePassword(password);
    const validateFirstName = adminValidator.validateName(first_name);
    const validateLastName = adminValidator.validateName(last_name);

    if (!validateEmail) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          email: "invalid value",
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
          first_name: "invalid value",
        };
        return newState;
      });
    }
    if (!validateLastName) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          last_name: "invalid value",
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

  return (
    <div className={classes["form-container"]}>
      <Form
        method="POST"
        className={classes["form"]}
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
            ref={first_nameRef}
          />
          {first_nameError}
        </div>
        <div className={classes["input-group"]}>
          <label>Last name</label>
          <input
            type="text"
            name="last_name"
            onBlur={inputOnBlurHandler}
            className={inputError.last_name ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            ref={last_nameRef}
          />
          {last_nameError}
        </div>

        <button
          type="submit"
          className={classes.action}
          disabled={isSubmitting || inputFormErrorExists}
        >
          {isSubmitting ? <Spinner /> : "Add admin"}
        </button>
      </Form>
    </div>
  );
}

export default AddAdmin;
