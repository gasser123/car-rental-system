import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import { AdminInfo } from "../validations/adminInfoValidation";
import { isArrayOfAdminInfo } from "../validations/adminInfoValidation";
import AdminsData from "../components/dashboard/admins/AdminsData";
function AllAdminsPage() {
  const data = useLoaderData();
  let admins: AdminInfo[] | null = null;
  if (isArrayOfAdminInfo(data)) {
    admins = data;
  }
  return <AdminsData admins={admins} />;
}

export const loader: LoaderFunction = async (loaderArgs) => {
  const {request} = loaderArgs;
  const requestURL = new URL(request.url);
  const searchTermValue = requestURL.searchParams.get("search");
  let url = "http://localhost:8080/admin/admins";
  if(searchTermValue){
    url = `http://localhost:8080/admin/admins?search=${searchTermValue}`;
   }
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const resData = await response.json();
  if (!response.ok) {
    throw json(
      { message: resData ? resData : response.statusText },
      { status: response.status }
    );
  }

  return resData;
};

export default AllAdminsPage;