import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./MainNavigation.module.css";
import carIcon from "../assets/car-solid.svg";
import LoginForm from "./login-form/LoginForm";
import { useContext, useRef } from "react";
import LoggedContext from "../store/logged-context";
import userImage from "../assets/user-regular.svg";
import logoutImage from "../assets/arrow-right-from-bracket-solid.svg";
import useClickAway from "../hooks/clickAway";
function MainNavigation() {
  const [loginModalShow, setLoginModalShow] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const optionsRef = useRef<HTMLUListElement>(null);
  const loggedContext = useContext(LoggedContext);

  const loggedIn = loggedContext.user;
  useEffect(() => {
    if (!optionsRef.current) {
      setShowOptions(false);
    }
  }, [loggedContext]);
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

  const onHideModalfunc = () => {
    setLoginModalShow(false);
  };

  const userIconOnClickHandler: React.MouseEventHandler<
    HTMLImageElement
  > = () => {
    setShowOptions(true);
  };

  const optionsCloseHandler = () => {
    setShowOptions(false);
  };

  const optionClickHandler: React.MouseEventHandler<HTMLAnchorElement> = () => {
    setShowOptions(false);
  };
  useClickAway(optionsRef, optionsCloseHandler);
  const userOptionsView = (
    <ul className={classes.options} ref={optionsRef}>
      <li className={classes.option}>
        <Link to={"/profile"} onClick={optionClickHandler}>
          Profile
        </Link>
      </li>
      <li className={classes.option}>
        <Link to={"/changepassword"} onClick={optionClickHandler}>
          Change password
        </Link>
      </li>
      <li className={classes.option}>
        <Link to={"/logout"}>
          <img src={logoutImage} alt="" className={classes["logout-icon"]} />
          Logout
        </Link>
      </li>
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
      <li className={classes["account-info"]}>
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
      <li className={classes["account-info"]}>
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
      {loginModalShow ? (
        <LoginForm
          onHideModal={onHideLoginForm}
          onHideModalfunc={onHideModalfunc}
        />
      ) : null}
    </>
  );
}

export default MainNavigation;
