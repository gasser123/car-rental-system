import Modal from "../UI/Modal";
import classes from "./LoginForm.module.css";
import Validator from "../../validations/Validator";
import { useState, useRef } from "react";
import circleXmark from "../../assets/circle-xmark-solid.svg";
import LoggedContext from "../../store/logged-context";
import { useContext } from "react";
import Spinner from "../UI/Spinner";
interface Props {
  onHideModal: React.MouseEventHandler<HTMLDivElement>;
  onHideModalfunc: () => void;
  children?: React.ReactNode;
}

const LoginForm: React.FC<Props> = (props) => {
  const [emailInputError, setEmailInputError] = useState<string | null>(null);
  const [passwordInputError, setPasswordInputError] = useState<string | null>(
    null
  );
  const [otherError, setOtherError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const loggedContextValue = useContext(LoggedContext);
  const validator = new Validator();
  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    if (otherError !== null) {
      setOtherError(null);
    }
    const emailValue = emailRef.current?.value;
    const emailValidate = validator.validateEmail(emailValue);
    if (!emailValidate) {
      setEmailInputError("invalid email address");
    }
    const passwordValue = passwordRef.current?.value;

    const passwordValidate = validator.validatePassword(passwordValue);
    if (!passwordValidate) {
      setPasswordInputError(`password should be at least 8 characters
        - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
        - Can contain special characters`);
    }

    if (!emailValidate || !passwordValidate) {
      return;
    }
    const inputData = {
      email: emailValue as string,
      password: passwordValue as string,
    };
    setIsLoading(true);
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(inputData),
    });

    setIsLoading(false);
    const result = await response.json();
    if (!response.ok) {
      setOtherError(result);
      return;
    }
    if (result === "invalid email or password") {
      setOtherError(result);
      return;
    }
    loggedContextValue.UpdateLogged("customer");
    props.onHideModalfunc();
  };

  const inputOnChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.currentTarget.name === "email") {
      if (emailInputError) {
        setEmailInputError(null);
      }
    } else if (event.currentTarget.name === "password") {
      if (passwordInputError) {
        setPasswordInputError(null);
      }
    }
  };

  const emailError = emailInputError ? (
    <p className={classes.error}>{emailInputError}</p>
  ) : null;
  const passwordError = passwordInputError ? (
    <p className={classes.error}>{passwordInputError}</p>
  ) : null;

  return (
    <Modal onHideModal={props.onHideModal}>
      <form className={classes["login-form"]} onSubmit={onSubmitHandler}>
        <h2>Sign in</h2>
        {otherError ? (
          <h3>
            <img src={circleXmark} alt="wrong" />
            {otherError}
          </h3>
        ) : null}
        <div className={classes["input-group"]}>
          <label>Email</label>
          <input
            type="email"
            ref={emailRef}
            onChange={inputOnChangeHandler}
            name="email"
            className={emailInputError ? classes["input-error"] : ""}
          />
          {emailError}
        </div>
        <div className={classes["input-group"]}>
          <label>Password</label>
          <input
            type="password"
            ref={passwordRef}
            onChange={inputOnChangeHandler}
            name="password"
            className={passwordInputError ? classes["input-error"] : ""}
          />
          {passwordError}
        </div>
        <button type="submit" className={classes.action} disabled={isLoading}>
          {isLoading ? <Spinner /> : "Login"}
        </button>
      </form>
    </Modal>
  );
};

export default LoginForm;
