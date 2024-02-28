import classes from "./Footer.module.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes["contact-info"]}>
        <Link to="/contact">Contact us</Link>
        <Link to="/about">About us</Link>
      </div>
      <div className={classes.copyrights}>
        &copy; 2024 NodeCar &nbsp;<span>||</span> &nbsp;{" "}
        <span>All rights reserved to NodeCar </span>
      </div>
    </footer>
  );
}

export default Footer;
