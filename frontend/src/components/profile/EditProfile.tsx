import { Form, useNavigation, useActionData } from "react-router-dom";
import classes from "./EditProfile.module.css";
import Validator from "../../validations/Validator";
import { useState, useRef } from "react";
import FormErrorResponse from "../../entities/FormErrorResponse";
import circleXmark from "../../assets/circle-xmark-solid.svg";
import Spinner from "../UI/Spinner";
import { CustomerInfo } from "../../validations/customerInfoValidation";
interface Props {
  info: CustomerInfo | null;
  children?: React.ReactNode;
}
type InputError = {
  driver_license_no: string | null;
  first_name: string | null;
  last_name: string | null;
  mobile_no: string | null;
};
const initialInputError: InputError = {
  driver_license_no: null,
  first_name: null,
  last_name: null,
  mobile_no: null,
};
const EditProfile: React.FC<Props> = (props) => {
  const [inputError, setInputError] = useState<InputError>(initialInputError);
  const navigation = useNavigation();
  const responseData = useActionData();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const licenseRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const profileData = props.info;
  const isSubmitting = navigation.state === "submitting";
  const validator = new Validator();
  const inputFormErrorExists: boolean =
    inputError.driver_license_no !== null ||
    inputError.first_name !== null ||
    inputError.last_name !== null ||
    inputError.mobile_no !== null
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
    const first_name = firstNameRef.current?.value!;
    const last_name = lastNameRef.current?.value!;
    const license = licenseRef.current?.value!;
    const mobile = mobileRef.current?.value!;

    const validateFirstName = validator.validateName(first_name);
    const validateLastName = validator.validateName(last_name);
    const validateLicense = validator.validateLicense(license);
    const validateMobile = validator.validateMobileNo(mobile);

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
            defaultValue={profileData ? profileData.driver_license_no : ""}
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
            defaultValue={profileData ? profileData.mobile_no : ""}
            ref={mobileRef}
          />
          {mobile_noError}
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

export default EditProfile;
