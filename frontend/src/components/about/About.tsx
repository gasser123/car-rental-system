import classes from "./About.module.css";
function About() {
  return (
    <div className={classes.about}>
      <h1>ABOUT US</h1>
      <p>
        Node car was founded in 1980 in Alexandria, Egypt and started out with a
        fleet of just three vehicles. As one of the first rental car companies
        in Egypt we have earned a trusted reputation as a leading car rental
        provider. Always at the forefront of the industry, we were the first car
        rental company with a website and the first to accept mobile
        reservations.
      </p>
      <h2>NODE CAR</h2>
      <p>
        Whether traveling for business or pleasure, Node car can satisfy your
        mobility needs. We have a large selection of luxury and economy vehicles
        on offer at affordable rates. With our excellent customer service and
        premium fleet we have your needs covered.
      </p>
    </div>
  );
}
export default About;
