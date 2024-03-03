import Modal from "../UI/Modal";
import classes from "./LoginForm.module.css";
import Validator from "../../validations/Validator";
import { useState, useRef } from "react";
interface Props {
  onHideModal: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
}

const LoginForm: React.FC<Props> = (props) => {
  const [emailInputError, setEmailInputError] = useState<string | null>(null);
  const [passwordInputError, setPasswordInputError] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const validator = new Validator();
  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
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
        <button type="submit" className={classes.action}>
          Login
        </button>
      </form>
    </Modal>
  );
};

export default LoginForm;
