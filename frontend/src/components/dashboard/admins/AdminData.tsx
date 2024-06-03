import classes from "./AdminData.module.css";
import { AdminInfo } from "../../../validations/adminInfoValidation";
interface Props {
  admins: AdminInfo[];
  children?: React.ReactNode;
}

const AdminData: React.FC<Props> = (props) => {
  const { admins } = props;
  return (
    <>
      {admins.map((element) => (
        <tr key={element.id}>
          <td>{element.id}</td>
          <td>{element.email}</td>
          <td>{element.first_name}</td>
          <td>{element.last_name}</td>
          <td>{element.role}</td>
          <td>
            <button className={classes["table-action-delete"]}>
              delete
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default AdminData;