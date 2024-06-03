import { ActionFunction, json, redirect } from "react-router-dom";
import AddAdmin from "../components/dashboard/admins/AddAdmin";
import Admin from "../entities/adminEntity";
import FormErrorResponse from "../entities/FormErrorResponse";
function AddAdminPage() {
  return <AddAdmin />;
}

export const action: ActionFunction = async (actionArgs) => {
  const { request } = actionArgs;
  const data = await request.formData();
  const admin: Admin = {
    email: data.get("email") as string,
    password: data.get("password") as string,
    first_name: data.get("first_name") as string,
    last_name: data.get("last_name") as string,
    role: "admin",
  };
  const url = "http://localhost:8080/admin/admins";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(admin),
  });

  const resData = await response.json();
  if (response.status === 422 || resData === "email is already used") {
    const formErrorResponse: FormErrorResponse = {
      errorMessage: resData,
      status: response.status,
    };
    return formErrorResponse;
  }
  if (!response.ok) {
    throw json({ message: resData }, { status: response.status });
  }

  return redirect("/dashboard/admins");
};

export default AddAdminPage;
