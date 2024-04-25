import AdminEditProfile from "../components/admin/profile/AdminEditProfile";
import {
  useRouteLoaderData,
  ActionFunction,
  json,
  redirect,
} from "react-router-dom";
import isAdminInfo, { AdminInfo } from "../validations/adminInfoValidation";
import FormErrorResponse from "../entities/FormErrorResponse";
function AdminEditProfilePage() {
  const data = useRouteLoaderData("admin-profile-data");
  let adminInfo: AdminInfo | null = null;
  if (isAdminInfo(data)) {
    adminInfo = data;
  }
  return <AdminEditProfile info={adminInfo} />;
}

export const action: ActionFunction = async (actionArgs) => {
  const { request } = actionArgs;
  // get the submitted form data
  const data = await request.formData();
  let url = "http://localhost:8080/admin/profile";
  // get function gets the entered data for the corresponding input name
  // passed as parameter
  const profileData = {
    first_name: data.get("first_name") as string,
    last_name: data.get("last_name") as string,
  };

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(profileData),
  });
  const message = await response.json();
  if (response.status === 422) {
    const formErrorResponse: FormErrorResponse = {
      errorMessage: message,
      status: response.status,
    };
    return formErrorResponse;
  }
  if (!response.ok) {
    throw json({ message: message }, { status: response.status });
  }

  return redirect("..");
};

export default AdminEditProfilePage;
