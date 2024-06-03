import Table from "../../UI/Table";
import AdminData from "./AdminData";
import { AdminInfo } from "../../../validations/adminInfoValidation";
interface Props {
  admins: AdminInfo[] | null;
  children?: React.ReactNode;
}
const AdminsData: React.FC<Props> = (props) => {
  const { admins } = props;
  return admins ? (
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
  ) : (
    <h2 style={{ textAlign: "center", margin: "0 auto" }}>
      No admins found at the moment
    </h2>
  );
};

export default AdminsData;
