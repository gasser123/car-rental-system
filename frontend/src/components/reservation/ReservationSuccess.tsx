import classes from "./ReservationSuccess.module.css";
import check_icon from "../../assets/circle-check-solid.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function ReservationSuccess() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/bookings");
    }, 4000);
  }, [navigate]);
  const content = (
    <>
      <h2>
        <img src={check_icon} alt="check-icon" /> Car rented successfully an
        invoice sent to your email
      </h2>

      <p>Redirecting...</p>
    </>
  );

  return <div className={classes.container}>{content}</div>;
}
export default ReservationSuccess;
