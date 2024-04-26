import { AdminInfo } from "../../validations/adminInfoValidation";
import classes from "./DashboardHome.module.css";
interface Props {
  info: AdminInfo | null;
  children?: React.ReactNode;
}
const DashboardHome: React.FC<Props> = (props) => {
  const adminInfo = props.info;
  return adminInfo ? <h1 className={classes.welcome}>{`Welcome ${adminInfo.first_name}`}</h1> : <></>;
};

export default DashboardHome;
