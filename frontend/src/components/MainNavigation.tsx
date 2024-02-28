import { Link, NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import carIcon from "../assets/car-solid.svg";
function MainNavigation() {
  return (
    <header className={classes.header}>
      <h1>
        <Link to={"/"}>
        <img src={carIcon} alt="car"/>
           NodeCar
        </Link>
      </h1>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/events">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/newsletter" className={classes.login}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
