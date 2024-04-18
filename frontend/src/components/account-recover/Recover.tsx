import { Form } from "react-router-dom";
import classes from "./Recover.module.css";
import Spinner from "../UI/Spinner";
import { useNavigation, useActionData } from "react-router-dom";
import Validator from "../../validations/Validator";
import { useState } from "react";
import FormErrorResponse from "../../entities/FormErrorResponse";
import circleXmark from "../../assets/circle-xmark-solid.svg";
function Recover() {
  const [inputError, setInputError] = useState<string | null>("");
  const navigation = useNavigation();
  const responseData = useActionData();
  const isSubmitting = navigation.state === "submitting";
  const validator = new Validator();
  const inputFormErrorExists: boolean = inputError !== null;
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
  const inputOnBlurHandler: React.FocusEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.currentTarget.value;
    const validate = validator.validateEmail(value);
    const stateValue: string | null = !validate ? "invalid email" : null;
    setInputError(stateValue);
  };

  const inputOnChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setInputError("");
  };

  const emailError = inputError ? (
    <p className={classes.error}>{inputError}</p>
  ) : null;
  return (
    <div className={classes["form-container"]}>
      <Form method="POST" className={classes["recover-form"]}>
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
          <label>Enter your email</label>
          <input
            type="email"
            name="email"
            onBlur={inputOnBlurHandler}
            className={inputError ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
          />
          {emailError}
        </div>
        <button
          type="submit"
          className={classes.action}
          disabled={isSubmitting || inputFormErrorExists}
        >
          {isSubmitting ? <Spinner /> : "Send reset link"}
        </button>
      </Form>
    </div>
  );
}

export default Recover;
