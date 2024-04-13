import classes from "./Activate.module.css";
import check_icon from "../../assets/circle-check-solid.svg";
import { useLoaderData } from "react-router-dom";
function Activate() {
  const message = useLoaderData();
  let content: JSX.Element;
  if (message && typeof message === "string") {
    content = (
      <h2>
        <img src={check_icon} alt="check-icon" /> {message + " you can now close this tab"}
      </h2>
    );
  } else {
    content = <h2>Error activating your account</h2>;
  }
  return <div className={classes.container}>{content}</div>;
}
export default Activate;
