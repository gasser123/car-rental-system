import { useState, useRef } from "react";
import { useNavigation, useActionData, Form } from "react-router-dom";
import Validator from "../../../validations/Validator";
import FormErrorResponse from "../../../entities/FormErrorResponse";
import classes from "./AdminLogin.module.css";
import circleXmark from "../../../assets/circle-xmark-solid.svg";
import Spinner from "../../UI/Spinner";
type InputError = {
  email: string | null;
  password: string | null;
};

const initialInputError: InputError = {
  email: null,
  password: null,
};
function AdminLogin() {
  const [inputError, setInputError] = useState<InputError>(initialInputError);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigation = useNavigation();
  const responseData = useActionData();
  const isSubmitting = navigation.state === "submitting";
  const validator = new Validator();
  let formErrorMessage: FormErrorResponse | null = null;
  let successMessage: string | null = null;
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
  } else if (responseData && typeof responseData === "string") {
    successMessage = responseData;
  }

  const inputOnChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.currentTarget.name === "email") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          email: null,
        };
        return newState;
      });
    } else {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          password: null,
        };
        return newState;
      });
    }
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    const emailValue = emailRef.current?.value!;
    const validateEmail = validator.validateEmail(emailValue);
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

    const valuePassword = passwordRef.current?.value!;

    const validatePassword = validator.validatePassword(valuePassword);

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
  };

  const emailError = inputError.email ? (
    <p className={classes.error}>{inputError.email}</p>
  ) : null;
  const passwordError = inputError.password ? (
    <p className={classes.error}>{inputError.password}</p>
  ) : null;
  return (
    <div className={classes["form-container"]}>
      <Form
        method="POST"
        className={classes["reset-form"]}
        onSubmit={onSubmitHandler}
      >
        {formErrorMessage ? (
          <h3 className={classes.fail}>
            <img src={circleXmark} alt="wrong" />
            {formErrorMessage.errorMessage}
          </h3>
        ) : null}

        {successMessage ? (
          <h3 className={classes.success}>{successMessage}</h3>
        ) : null}
        <div className={classes["input-group"]}>
          <label>Email</label>
          <input
            type="email"
            name="email"
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
            className={inputError.password ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            ref={passwordRef}
          />
          {passwordError}
        </div>
        <button
          type="submit"
          className={classes.action}
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "Login"}
        </button>
      </Form>
    </div>
  );
}
export default AdminLogin;
