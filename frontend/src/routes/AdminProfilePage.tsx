import AdminProfile from "../components/admin/profile/AdminProfile";
import { useRouteLoaderData, LoaderFunction, json } from "react-router-dom";
import isAdminInfo, { AdminInfo } from "../validations/adminInfoValidation";
function AdminProfilePage() {
  const data = useRouteLoaderData("admin-profile-data");
  let adminInfo: AdminInfo | null = null;
  if (isAdminInfo(data)) {
    adminInfo = data;
  }
  return <AdminProfile info={adminInfo} />;
}

export const loader: LoaderFunction = async () => {
    const response = await fetch("http://localhost:8080/admin/profile", {
      method: "GET",
      credentials: "include",
    });
    const value = await response.json();
    if (!response.ok) {
      throw json({ message: value }, { status: response.status });
    }
  
    return value;
  };

export default AdminProfilePage;
