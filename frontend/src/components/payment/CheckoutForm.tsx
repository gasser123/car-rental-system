import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import classes from "./CheckoutForm.module.css";
import Spinner from "../UI/Spinner";
import circleXmark from "../../assets/circle-xmark-solid.svg";
import ReservationOrderInfo from "../../entities/ReservationOrderInfo";
interface Props {
  onHideModal: () => void;
  reservationOrderInfo: ReservationOrderInfo;
}
// Define the CheckoutForm component
const CheckoutForm: React.FC<Props> = (props) => {
  const { reservationOrderInfo } = props;
  const stripe = useStripe(); // Hook to get the Stripe instance
  const elements = useElements(); // Hook to get the Elements instance
  const [error, setError] = useState<string | null | undefined>(null); // State to store any error messages
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Handle form submission
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true);
    setError(null);
    if (!stripe || !elements) {
      setError("Error retrieving data try again");
      setIsLoading(false);
      return; // Ensure that Stripe.js has loaded before proceeding
    }

    // Trigger form validation and wallet collection
    const { error: validationError } = await elements.submit();
    if (validationError) {
      setError(validationError.message);
      setIsLoading(false);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret
    try {
      const res = await fetch("http://localhost:8080/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(reservationOrderInfo),
      });

     if(!res.ok){
      const errorMessage = await res.json();
      throw new Error(errorMessage);
     }

      const { clientSecret } = await res.json();
      const hostName = window.location.hostname;
      const port = window.location.port ? `:${window.location.port}` : "";
      const protocol = window.location.protocol;
      // Use the clientSecret and Elements instance to confirm the setup
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${protocol}//${hostName}${port}/success`,
        },
        // Uncomment below if you only want redirect for redirect-based payments
        // redirect: "if_required",
      });

      if (error) {
        setError(error.message); // Set the error state if an error occurs
        setIsLoading(false);
      }

      setIsLoading(false);
      props.onHideModal();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      {error ? (
        <h3>
          <img src={circleXmark} alt="wrong" />
          {error}
        </h3>
      ) : null}
      <PaymentElement /> {/* Stripe PaymentElement */}
      <button
        type="submit"
        className={classes.action}
        disabled={!stripe || isLoading}
      >
        {isLoading ? <Spinner /> : "Pay"}
      </button>{" "}
      {/* Disable button if Stripe or clientSecret is not loaded */}
    </form>
  );
};

export default CheckoutForm;
