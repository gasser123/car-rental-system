import Table from "../../UI/Table";
import AdminData from "./AdminData";
import { AdminInfo } from "../../../validations/adminInfoValidation";
import classes from "./AdminsData.module.css";
import SearchBar from "../../UI/SearchBar";
import { Form } from "react-router-dom";
interface Props {
  admins: AdminInfo[] | null;
  children?: React.ReactNode;
}
const AdminsData: React.FC<Props> = (props) => {
  const { admins } = props;
  return admins ? (
    <div className={classes["dashboard-main"]}>
      <Form method="GET">
        <SearchBar />
      </Form>
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <AdminData admins={admins} />
      </tbody>
    </Table>
    </div>
  ) : (
    <h2 style={{ textAlign: "center", margin: "0 auto" }}>
      No admins found at the moment
    </h2>
  );
};

export default AdminsData;
