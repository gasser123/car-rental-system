import AdminLogin from "../components/admin/login/AdminLogin";
import { ActionFunction, json, redirect } from "react-router-dom";
import FormErrorResponse from "../entities/FormErrorResponse";
function AdminLoginPage() {
  return <AdminLogin />;
}

export const action: ActionFunction = async (actionArgs) => {
  const { request } = actionArgs;
  // get the submitted form data
  const data = await request.formData();
  let url = "http://localhost:8080/admin";
  // get function gets the entered data for the corresponding input name
  // passed as parameter
  const inputData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(inputData),
  });
  const message = await response.json();
  if (
    response.status === 422 ||
    message === "invalid email or password"
  ) {
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
export default AdminLoginPage;
