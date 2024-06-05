import classes from "./AdminData.module.css";
import { AdminInfo } from "../../../validations/adminInfoValidation";
import { useFetcher } from "react-router-dom";
interface Props {
  admins: AdminInfo[];
  children?: React.ReactNode;
}

const AdminData: React.FC<Props> = (props) => {
  const { admins } = props;
  const deleteFetcher = useFetcher();
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
            {<deleteFetcher.Form method="DELETE" action={`${element.id}/delete`}>
              <button type="submit" className={classes["table-action-delete"]}>
              delete
            </button>
            </deleteFetcher.Form>}
            
          </td>
        </tr>
      ))}
    </>
  );
};

export default AdminData;