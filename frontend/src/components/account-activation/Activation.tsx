import classes from "./Activation.module.css";
import email_icon from "../../assets/envelope-solid.svg";
import { useState } from "react";
import Spinner from "../UI/Spinner";
import FormErrorResponse from "../../entities/FormErrorResponse";
function Activation() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<FormErrorResponse | null>(
    null
  );
  const [successResponse, setSuccessResponse] = useState<string | null>(null);
  const resendActivationHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      setErrorResponse(null);
      setSuccessResponse(null);
      const response = await fetch("http://localhost:8080/activation", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setIsLoading(false);
      const message = await response.json();
      if (!response.ok) {
        const res: FormErrorResponse = {
          errorMessage: message,
          status: response.status,
        };
        setErrorResponse(res);
        return;
      }
      setSuccessResponse(message);
    } catch (error) {
      console.log(error);
    }
  };

  let responseMessage = <></>;
  if (errorResponse) {
    responseMessage = (
      <p className={classes.error}>{errorResponse.errorMessage}</p>
    );
  } else if (successResponse) {
    responseMessage = <p className={classes.success}>{successResponse}</p>;
  }

  return (
    <div className={classes.container}>
      <h2>
        <img src={email_icon} alt="email-icon" /> Activation link has been sent
        to your email you need to activate your account in order to start
        reservation
      </h2>
      <p>haven't received an email yet?</p>
      <button
        type="button"
        onClick={resendActivationHandler}
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "Resend activation"}
      </button>
      {responseMessage}
    </div>
  );
}

export default Activation;
