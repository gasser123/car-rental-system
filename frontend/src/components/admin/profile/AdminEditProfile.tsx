import { Form, useNavigation, useActionData } from "react-router-dom";
import classes from "./AdminEditProfile.module.css";
import Validator from "../../../validations/Validator";
import { useState, useRef } from "react";
import FormErrorResponse from "../../../entities/FormErrorResponse";
import circleXmark from "../../../assets/circle-xmark-solid.svg";
import Spinner from "../../UI/Spinner";
import { AdminInfo } from "../../../validations/adminInfoValidation";
interface Props {
  info: AdminInfo | null;
  children?: React.ReactNode;
}
type InputError = {
  first_name: string | null;
  last_name: string | null;
};
const initialInputError: InputError = {
  first_name: null,
  last_name: null,
};
const AdminEditProfile: React.FC<Props> = (props) => {
  const [inputError, setInputError] = useState<InputError>(initialInputError);
  const navigation = useNavigation();
  const responseData = useActionData();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const profileData = props.info;
  const isSubmitting = navigation.state === "submitting";
  const validator = new Validator();
  const inputFormErrorExists: boolean =
    inputError.first_name !== null || inputError.last_name !== null
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
    if (name === "first_name") {
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
    }
  };
  const inputOnChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const name = event.currentTarget.name;
    if (name === "first_name") {
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
    const first_name = firstNameRef.current?.value!;
    const last_name = lastNameRef.current?.value!;

    const validateFirstName = validator.validateName(first_name);
    const validateLastName = validator.validateName(last_name);

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
  };

  const first_nameError = inputError.first_name ? (
    <p className={classes.error}>{inputError.first_name}</p>
  ) : null;
  const last_nameError = inputError.last_name ? (
    <p className={classes.error}>{inputError.last_name}</p>
  ) : null;

  return (
    <div className={classes["form-container"]}>
      <Form
        method="PATCH"
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
          <label>First name</label>
          <input
            type="text"
            name="first_name"
            onBlur={inputOnBlurHandler}
            className={inputError.first_name ? classes["input-error"] : ""}
            onChange={inputOnChangeHandler}
            defaultValue={profileData ? profileData.first_name : ""}
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
            defaultValue={profileData ? profileData.last_name : ""}
            ref={lastNameRef}
          />
          {last_nameError}
        </div>

        <button
          type="submit"
          className={classes.action}
          disabled={isSubmitting || inputFormErrorExists}
        >
          {isSubmitting ? <Spinner /> : "Update profile"}
        </button>
      </Form>
    </div>
  );
};

export default AdminEditProfile;
