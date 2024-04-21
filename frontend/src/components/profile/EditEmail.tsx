import { useState, useRef } from "react";
import { useNavigation, useActionData, Form } from "react-router-dom";
import Validator from "../../validations/Validator";
import FormErrorResponse from "../../entities/FormErrorResponse";
import classes from "./EditEmail.module.css";
import circleXmark from "../../assets/circle-xmark-solid.svg";
import Spinner from "../UI/Spinner";
type InputError = {
  email: string | null;
  currentPassword: string | null;
};

const initialInputError: InputError = {
  email: null,
  currentPassword: null,
};

function EditEmail() {
  const [inputError, setInputError] = useState<InputError>(initialInputError);
  const emailRef = useRef<HTMLInputElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);
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
          currentPassword: null,
        };
        return newState;
      });
    }
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    const valueNew = emailRef.current?.value!;
    const validateNew = validator.validateEmail(valueNew);
    if (!validateNew) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          email: "invalid email",
        };
        return newState;
      });
    }

    const valuePassword = currentPasswordRef.current?.value!;

    const validatePassword = validator.validatePassword(valuePassword);

    if (!validatePassword) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          currentPassword: `password should be at least 8 characters - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number - Can contain special characters`,
        };
        return newState;
      });
    }
  };

  const emailError = inputError.email ? (
    <p className={classes.error}>{inputError.email}</p>
  ) : null;
  const currentPasswordError = inputError.currentPassword ? (
    <p className={classes.error}>{inputError.currentPassword}</p>
  ) : null;
  return (
    <div className={classes["form-container"]}>
      <Form
        method="PATCH"
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
          <label>New Email</label>
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
          <label>Enter your password</label>
          <input
            type="password"
            name="currentPassword"
            className={inputError.currentPassword ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            ref={currentPasswordRef}
          />
          {currentPasswordError}
        </div>
        <button
          type="submit"
          className={classes.action}
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "Update email"}
        </button>
      </Form>
    </div>
  );
}

export default EditEmail;
