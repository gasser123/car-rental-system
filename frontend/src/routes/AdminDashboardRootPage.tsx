import DashboardMain from "../components/dashboard/DashboardMain";
import { Outlet } from "react-router-dom";
function AdminDashboardRootPage() {
  return (
    <DashboardMain>
      <Outlet />
    </DashboardMain>
  );
}

export default AdminDashboardRootPage;
