import { ActionFunction, json, redirect } from "react-router-dom";
import EditEmail from "../components/profile/EditEmail";
import FormErrorResponse from "../entities/FormErrorResponse";
function EditEmailPage() {
  return <EditEmail />;
}

export const action: ActionFunction = async (actionArgs) => {
  const { request } = actionArgs;
  // get the submitted form data
  const data = await request.formData();
  let url = "http://localhost:8080/editemail";
  // get function gets the entered data for the corresponding input name
  // passed as parameter
  const inputData = {
    email: data.get("email"),
    currentPassword: data.get("currentPassword"),
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
    message === "email is already used"
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

  return redirect("/activation");
};

export default EditEmailPage;
