import Car from "../../entities/carEntity";
import classes from "./CarData.module.css";
import { daysBetweenDates } from "../../utilities/calculations";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import LoggedContext from "../../store/logged-context";
import LoginForm from "../login-form/LoginForm";
import ActivateAccountModal from "../account-activation/ActivateAccountModal";
interface Props {
  car: Car;
  children?: React.ReactNode;
}
const CarData: React.FC<Props> = (props) => {
  const { car } = props;
  const navigate = useNavigate();
  const loggedContext = useContext(LoggedContext);
  const loggedIn = loggedContext.user;
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showActivationModal, setShowActivationModal] =
    useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const country = searchParams.get("country");
  const pickupLocation = searchParams.get("pickupLocation");
  const returnLocation = searchParams.get("returnLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");
  let totalAmount: number | null = null;
  if (pickupDate && returnDate) {
    const daysDifference = daysBetweenDates(pickupDate, returnDate);
    totalAmount = car.price_per_day * daysDifference;
  }

  const carClickHandler: React.MouseEventHandler<HTMLDivElement> = async () => {
    if (!(loggedIn && loggedIn === "customer")) {
      setShowLoginModal(true);
      return;
    }
    const verifiedResponse = await fetch("http://localhost:8080/verified", {
      method: "GET",
      credentials: "include",
    });

    if (!verifiedResponse.ok) {
      return;
    }
    const verifiedObject = (await verifiedResponse.json()) as unknown;
    let verified = 0;
    if (
      verifiedObject &&
      typeof verifiedObject === "object" &&
      "verified" in verifiedObject &&
      typeof verifiedObject.verified === "number"
    ) {
      verified = verifiedObject.verified;
    }

    if (!verified) {
      setShowActivationModal(true);
      return;
    }

    navigate(
      `/reservation?country=${country}&pickupLocation=${pickupLocation}&returnLocation=${returnLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}&carid=${car.id}`
    );
  };

  const onHideLoginForm: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setShowLoginModal(false);
  };

  const onHideLoginModalfunc = () => {
    setShowLoginModal(false);
  };

  const onHideActivationModal: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    event.preventDefault();
    setShowActivationModal(false);
  };

  const onHideActivationModalfunc = () => {
    setShowActivationModal(false);
  };

  return (
    <>
      {showLoginModal ? (
        <LoginForm
          onHideModal={onHideLoginForm}
          onHideModalfunc={onHideLoginModalfunc}
        />
      ) : null}

      {showActivationModal ? (
        <ActivateAccountModal
          onHideModal={onHideActivationModal}
          onHideModalfunc={onHideActivationModalfunc}
        />
      ) : null}
      <div className={classes["car-container"]} onClick={carClickHandler}>
        <img src={car.image_url} alt="car" className={classes["car-img"]} />
        <div className={classes.info}>
          <p>
            Model: <span className={classes.data}>{car.model}</span>
          </p>
          <p>
            Year: <span className={classes.data}>{car.year}</span>
          </p>
          <p>
            Color: <span className={classes.data}>{car.color}</span>
          </p>
          <p>
            Status:{" "}
            <span
              className={
                car.status === "Available"
                  ? classes.available
                  : classes.unavailable
              }
            >
              {car.status}
            </span>
          </p>
          <h3>
            Total amount:{" "}
            <span className={classes.data}>{`$${totalAmount}`}</span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default CarData;
