import classes from "./Contact.module.css";
function Contact() {
  return (
    <div className={classes.contact}>
      <h1>Contact</h1>
      <p>Tel: some number</p>
      <p>Fax: some number </p>
      <p>Email: info@NodeCar.com</p>
    </div>
  );
}

export default Contact;
