import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { StripeElementsOptionsMode } from "@stripe/stripe-js";
import ReservationOrderInfo from "../../entities/ReservationOrderInfo";
// Load Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51OiC8THWgOCu9vyCp5Fjx1C6m4Bl5uqBCJXYHeO2ffjkz9bFUNZy6svkZOdy41AdVzPhPCqT4qqi8XHOL2Ud7lQi00j3Actyx0"
);
interface Props {
  onHideModal: () => void;
  reservationOrderInfo: ReservationOrderInfo;
}
const StripePayment: React.FC<Props> = (props) => {
  const {reservationOrderInfo} = props;
  const options: StripeElementsOptionsMode = {
    mode: "payment",
    currency: "usd",
    // multiply by 100 because the amount takes the subunit for currency
    // in this case 1 dollar = 100 cents for usd currency
    amount: reservationOrderInfo.total_amount * 100,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {" "}
      {/* Wrap the CheckoutForm in Elements provider */}
      <CheckoutForm onHideModal={props.onHideModal} reservationOrderInfo={reservationOrderInfo} />
    </Elements>
  );
};

export default StripePayment;
