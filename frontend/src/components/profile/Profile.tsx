import isCustomerInfo, {
  CustomerInfo,
} from "../../validations/customerInfoValidation";
import classes from "./Profile.module.css";
import { Link, useLoaderData } from "react-router-dom";
function Profile() {
  const data = useLoaderData();
  let customerInfo: CustomerInfo | null = null;
  if (isCustomerInfo(data)) {
    customerInfo = data;
  }
  return (
    <div className={classes.container}>
      <div className={classes["info-container"]}>
        <div>
          <div>
            <h3>First name</h3>
            <p>{customerInfo ? customerInfo.first_name : "nothing to show"}</p>
          </div>
          <div>
            <h3>Last name</h3>
            <p>{customerInfo ? customerInfo.last_name : "nothing to show"}</p>
          </div>
          <div>
            <h3>License no</h3>
            <p>
              {customerInfo
                ? customerInfo.driver_license_no
                : "nothing to show"}
            </p>
          </div>
          <div>
            <h3>Mobile no</h3>
            <p>{customerInfo ? customerInfo.mobile_no : "nothing to show"}</p>
          </div>
        </div>
        <Link className={classes.link} to="editprofile">
          Edit profile
        </Link>
      </div>
      <div className={classes["email-container"]}>
        <div>
          <h3>Email</h3>
          <p>{customerInfo ? customerInfo.email : "nothing to show"}</p>
        </div>
        <Link className={classes.link} to="editemail">
          Change email
        </Link>
      </div>
    </div>
  );
}

export default Profile;
