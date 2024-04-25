import { Link } from "react-router-dom";
import classes from "./DashboardMain.module.css";
import arrow_down_icon from "../../assets/chevron-down-solid.svg";
import arrow_up_icon from "../../assets/chevron-up-solid.svg";
import { useState } from "react";
type DropDownsState = {
  reservations: boolean;
  cars: boolean;
  pickupLocations: boolean;
  returnLocations: boolean;
  admins: boolean;
};
const initialDropDownsState = {
  reservations: false,
  cars: false,
  pickupLocations: false,
  returnLocations: false,
  admins: false,
};
interface Props {
  children?: React.ReactNode;
}

const SideBarNav: React.FC<Props> = (props) => {
  const [dropDownsState, setDropdownsState] = useState<DropDownsState>(
    initialDropDownsState
  );

  const reservationsLinks = (
    <div className={classes["dropdowns-links"]}>
      <Link to="unconfirmed">Unconfirmed reservations</Link>
      <Link to="reservations">All reservations</Link>
    </div>
  );

  const carsLinks = (
    <div className={classes["dropdowns-links"]}>
      <Link to="cars">All cars</Link>
      <Link to="addcar">Add new Car</Link>
    </div>
  );

  const pickupLocationsLinks = (
    <div className={classes["dropdowns-links"]}>
      <Link to="pickuplocations">All pickup loations</Link>
      <Link to="addpickuplocation">Add new pickup location</Link>
    </div>
  );

  const returnLocationsLinks = (
    <div className={classes["dropdowns-links"]}>
      <Link to="returnlocations">All return loations</Link>
      <Link to="addreturnlocation">Add new return location</Link>
    </div>
  );

  const adminsLinks = (
    <div className={classes["dropdowns-links"]}>
      <Link to="admins">All admins</Link>
      <Link to="addadmin">Add new admin</Link>
    </div>
  );
  const onDropDownClick: React.MouseEventHandler<HTMLLIElement> = (event) => {
    if (event.currentTarget.id === "reservations") {
      setDropdownsState((currentState) => {
        const newState: DropDownsState = {
          ...currentState,
          reservations: !currentState.reservations,
        };
        return newState;
      });
    } else if (event.currentTarget.id === "cars") {
      setDropdownsState((currentState) => {
        const newState: DropDownsState = {
          ...currentState,
          cars: !currentState.cars,
        };
        return newState;
      });
    } else if (event.currentTarget.id === "pickupLocations") {
      setDropdownsState((currentState) => {
        const newState: DropDownsState = {
          ...currentState,
          pickupLocations: !currentState.pickupLocations,
        };
        return newState;
      });
    } else if (event.currentTarget.id === "returnLocations") {
      setDropdownsState((currentState) => {
        const newState: DropDownsState = {
          ...currentState,
          returnLocations: !currentState.returnLocations,
        };
        return newState;
      });
    } else if (event.currentTarget.id === "admins") {
      setDropdownsState((currentState) => {
        const newState: DropDownsState = {
          ...currentState,
          admins: !currentState.admins,
        };
        return newState;
      });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <ul className={classes["sidebar-nav"]}>
          <li id="reservations" onClick={onDropDownClick}>
            Reservations{" "}
            <img
              src={
                dropDownsState.reservations ? arrow_up_icon : arrow_down_icon
              }
              alt="arrow-down"
            />
            {dropDownsState.reservations ? reservationsLinks : null}
          </li>
          <li id="cars" onClick={onDropDownClick}>
            Cars{" "}
            <img
              src={dropDownsState.cars ? arrow_up_icon : arrow_down_icon}
              alt="arrow-down"
            />
            {dropDownsState.cars ? carsLinks : null}
          </li>
          <li id="pickupLocations" onClick={onDropDownClick}>
            Pickup locations{" "}
            <img
              src={
                dropDownsState.pickupLocations ? arrow_up_icon : arrow_down_icon
              }
              alt="arrow-down"
            />
            {dropDownsState.pickupLocations ? pickupLocationsLinks : null}
          </li>
          <li id="returnLocations" onClick={onDropDownClick}>
            Return locations{" "}
            <img
              src={
                dropDownsState.returnLocations ? arrow_up_icon : arrow_down_icon
              }
              alt="arrow-down"
            />
            {dropDownsState.returnLocations ? returnLocationsLinks : null}
          </li>
          <li id="admins" onClick={onDropDownClick}>
            Admins{" "}
            <img
              src={dropDownsState.admins ? arrow_up_icon : arrow_down_icon}
              alt="arrow-down"
            />
            {dropDownsState.admins ? adminsLinks : null}
          </li>
        </ul>
      </div>
      {props.children}
    </div>
  );
};

export default SideBarNav;
