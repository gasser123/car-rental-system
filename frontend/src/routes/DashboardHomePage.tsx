import DashboardHome from "../components/dashboard/DashboardHome";
import { useRouteLoaderData } from "react-router-dom";
import isAdminInfo, { AdminInfo } from "../validations/adminInfoValidation";
function DashboardHomePage() {
  const data = useRouteLoaderData("admin-dashboard-root");
  let adminInfo: AdminInfo | null = null;
  if (isAdminInfo(data)) {
    adminInfo = data;
  }
  return <DashboardHome info={adminInfo} />;
}

export default DashboardHomePage;
