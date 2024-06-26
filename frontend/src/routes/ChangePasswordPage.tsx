import ChangePassword from "../components/change-password/ChangePassword";
import { ActionFunction, json, useNavigate } from "react-router-dom";
import FormErrorResponse from "../entities/FormErrorResponse";
import { useContext, useEffect } from "react";
import LoggedContext from "../store/logged-context";
import { getCookie } from "../utilities/cookie";
function ChangePasswordPage() {
  const loggedContext = useContext(LoggedContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedContext.user !== "customer" && loggedContext.user !== "admin") {
      navigate("/");
    }
  }, [loggedContext.user, navigate]);
  return <ChangePassword />;
}

export const action: ActionFunction = async (actionArgs) => {
  const { request } = actionArgs;
  const user = getCookie("logged");
  let url: string = "http://localhost:8080/changepassword";
  if (user === "customer") {
    url = "http://localhost:8080/changepassword";
  } else if (user === "admin") {
    url = "http://localhost:8080/admin/changepassword";
  } else {
    return;
  }
  // get the submitted form data
  const data = await request.formData();
  // get function gets the entered data for the corresponding input name
  // passed as parameter
  const inputData = {
    currentPassword: data.get("currentPassword"),
    newPassword: data.get("newPassword"),
    confirmPassword: data.get("confirmPassword"),
  };

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(inputData),
  });
  const message = await response.json();
  if (
    response.status === 422 ||
    response.status === 401 ||
    message === "wrong current password"
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

  return message;
};

export default ChangePasswordPage;
