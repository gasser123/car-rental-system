import { ActionFunction, json } from "react-router-dom";
import PasswordReset from "../components/account-recover/PasswordReset";
import FormErrorResponse from "../entities/FormErrorResponse";
function PasswordResetPage() {
  return <PasswordReset />;
}

export const action: ActionFunction = async (args) => {
  const { request, params } = args;
  const token = params.token;
  if (!token) {
    throw json({ message: "resource not found" }, { status: 404 });
  }
  const data = await request.formData();
  const requestBody = {
    newPassword: data.get("newPassword")!,
    confirmPassword: data.get("confirmPassword")!,
  };
  const response = await fetch(`http://localhost:8080/reset/${token}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    const formErrorMessage: FormErrorResponse = {
      errorMessage: responseBody,
      status: response.status,
    };

    return formErrorMessage;
  }

  return responseBody;
};
export default PasswordResetPage;
