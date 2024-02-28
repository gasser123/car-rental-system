import classes from "./HomeInfo.module.css";
import offerIcon from "../assets/handshake-solid.svg";
import carIcon from "../assets/car-solid.svg";
import handIcon from "../assets/hand-holding-heart-solid.svg";
function HomeInfo() {
  return (
    <>
      <div className={classes.first}>
        <h1>RENT FIRST CLASS</h1>
        <h1>PAY ECONOMY</h1>
      </div>
      <div className={classes.second}>
        <div className={classes.container}>
          <div className={classes.title}>
            <img src={offerIcon} alt="offer" />
            <h3>Best offers</h3>
          </div>

          <div className={classes.content}>
            <p>Premium car rental at affordable rates</p>
          </div>
        </div>
        <div className={classes.container}>
          <div className={classes.title}>
            <img src={carIcon} alt="cars" />
            <h3>Distinctive fleet</h3>
          </div>
          <div className={classes.content}>
            <p>From high-end convertibles to premium SUVs</p>
          </div>
        </div>

        <div className={classes.container}>
          <div className={classes.title}>
            <img src={handIcon} alt="service" />
            <h3>Exceptional service</h3>
          </div>

          <div className={classes.content}>
            <p>Stress-free, trustworthy, no hidden costs</p>
          </div>
        </div>
      </div>

      <div className={classes.imgcontainer}>
        <h1>Rent your dream car now </h1>
      </div>

      <div className={classes["company-info"]}>
        <h2>NODE CAR RENTAL</h2>
        <p>
          For your car rental, you can choose from a wide variety of vehicles.
          We have up-to-date models from some of the best car manufacturers in
          the world that can suit all kinds of travels. Choose from compact cars
          and sedans, sports cars and convertibles and SUVs. You can also tailor
          your car with deals on add-ons and upgrades.
        </p>
      </div>
    </>
  );
}

export default HomeInfo;
