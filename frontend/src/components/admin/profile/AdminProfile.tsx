import classes from "./AdminProfile.module.css";
import isAdminInfo, {
  AdminInfo,
} from "../../../validations/adminInfoValidation";
import { Link } from "react-router-dom";
interface Props {
  info: AdminInfo | null;
  children?: React.ReactNode;
}
const AdminProfile: React.FC<Props> = (props) => {
  const data = props.info;
  let adminInfo: AdminInfo | null = null;
  if (isAdminInfo(data)) {
    adminInfo = data;
  }
  return (
    <div className={classes.container}>
      <div className={classes["info-container"]}>
        <div>
          <div>
            <h3>First name</h3>
            <p>{adminInfo ? adminInfo.first_name : "nothing to show"}</p>
          </div>
          <div>
            <h3>Last name</h3>
            <p>{adminInfo ? adminInfo.last_name : "nothing to show"}</p>
          </div>
        </div>
        <Link className={classes.link} to="editprofile">
          Edit profile
        </Link>
      </div>
      <div className={classes["email-container"]}>
        <div>
          <h3>Email</h3>
          <p>{adminInfo ? adminInfo.email : "nothing to show"}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
