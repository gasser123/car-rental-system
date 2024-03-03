import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import classes from "./MainNavigation.module.css";
import carIcon from "../assets/car-solid.svg";
import LoginForm from "./login-form/LoginForm";
import { useContext } from "react";
import LoggedContext from "../store/logged-context";
import userImage from "../assets/user-regular.svg";
import logoutImage from "../assets/arrow-right-from-bracket-solid.svg";
function MainNavigation() {
  const [loginModalShow, setLoginModalShow] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const loggedContext = useContext(LoggedContext);
  const loggedIn = loggedContext.user;
  const loginClickHandler: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    event.preventDefault();
    setLoginModalShow(true);
  };

  const onHideLoginForm: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setLoginModalShow(false);
  };

  const userIconOnClickHandler: React.MouseEventHandler<
    HTMLImageElement
  > = () => {
    setShowOptions(true);
  };

  const userOptionsView = (
    <ul className={classes.options}>
      <li className={classes.Option}>Profile</li>
      <li className={classes.Option}>Change Password</li>
      <li className={classes.Option}><img src={logoutImage} alt="" />Logout</li>
    </ul>
  );

  const notLoggedInView = (
    <ul className={classes.list}>
      <li>
        <NavLink to="/register">Signup</NavLink>
      </li>
      <li>
        <button className={classes.login} onClick={loginClickHandler}>
          Login
        </button>
      </li>
    </ul>
  );

  const customerLoggedInView = (
    <ul className={classes.list}>
      <li>
        <NavLink to="/bookings">Bookings</NavLink>
      </li>
      <li>
        <div className={classes["options-container"]}>
          <img
            src={userImage}
            alt="user"
            onClick={userIconOnClickHandler}
            className={classes["user-icon"]}
          />
          {showOptions ? userOptionsView : null}
        </div>
      </li>
    </ul>
  );

  const adminLoggedInView = (
    <ul className={classes.list}>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <div className={classes["options-container"]}>
          <img
            src={userImage}
            alt="user"
            onClick={userIconOnClickHandler}
            className={classes["user-icon"]}
          />
          {showOptions ? userOptionsView : null}
        </div>
      </li>
    </ul>
  );
  let navView: JSX.Element = notLoggedInView;
  if (loggedIn === "customer") {
    navView = customerLoggedInView;
  } else if (loggedIn === "admin") {
    navView = adminLoggedInView;
  } else {
    navView = notLoggedInView;
  }
  return (
    <>
      <header className={classes.header}>
        <h1>
          <Link to={"/"}>
            <img src={carIcon} alt="car" />
            NodeCar
          </Link>
        </h1>
        <nav>{navView}</nav>
      </header>
      {loginModalShow ? <LoginForm onHideModal={onHideLoginForm} /> : null}
    </>
  );
}

export default MainNavigation;
