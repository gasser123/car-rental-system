import ChangePassword from "../components/change-password/ChangePassword";
import { ActionFunction, json } from "react-router-dom";
import FormErrorResponse from "../entities/FormErrorResponse";
function ChangePasswordPage() {
  return <ChangePassword />;
}

export const action: ActionFunction = async (actionArgs) => {
    const { request } = actionArgs;
    // get the submitted form data
    const data = await request.formData();
    let url = "http://localhost:8080/changepassword";
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
