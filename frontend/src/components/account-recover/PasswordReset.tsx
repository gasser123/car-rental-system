import { useState, useRef } from "react";
import { useNavigation, useActionData, Form } from "react-router-dom";
import Validator from "../../validations/Validator";
import FormErrorResponse from "../../entities/FormErrorResponse";
import classes from "./PasswordReset.module.css";
import circleXmark from "../../assets/circle-xmark-solid.svg";
import Spinner from "../UI/Spinner";
type InputError = {
  newPassword: string | null;
  confirmPassword: string | null;
};

const initialInputError: InputError = {
  newPassword: null,
  confirmPassword: null,
};
function PasswordReset() {
  const [inputError, setInputError] = useState<InputError>(initialInputError);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
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
    if (event.currentTarget.name === "newPassword") {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          newPassword: null,
        };
        return newState;
      });
    } else {
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          confirmPassword: null,
        };
        return newState;
      });
    }
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    const valueNew = newPasswordRef.current?.value!;
    const validateNew = validator.validatePassword(valueNew);
    if (!validateNew) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          newPassword: `password should be at least 8 characters - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number - Can contain special characters`,
        };
        return newState;
      });
    }

    const valueConfirm = confirmPasswordRef.current?.value!;

    const validateConfirm = valueConfirm === valueNew;

    if (!validateConfirm) {
      event.preventDefault();
      setInputError((currentState) => {
        const newState: InputError = {
          ...currentState,
          confirmPassword: "inputs don't match",
        };
        return newState;
      });
    }
  };

  const newPasswordError = inputError.newPassword ? (
    <p className={classes.error}>{inputError.newPassword}</p>
  ) : null;
  const confirmPasswordError = inputError.confirmPassword ? (
    <p className={classes.error}>{inputError.confirmPassword}</p>
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
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            className={inputError.newPassword ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            ref={newPasswordRef}
          />
          {newPasswordError}
        </div>

        <div className={classes["input-group"]}>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className={inputError.confirmPassword ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            ref={confirmPasswordRef}
          />
          {confirmPasswordError}
        </div>
        <button
          type="submit"
          className={classes.action}
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "Send reset link"}
        </button>
      </Form>
    </div>
  );
}

export default PasswordReset;
