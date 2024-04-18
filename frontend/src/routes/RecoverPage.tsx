import Recover from "../components/account-recover/Recover";
import { ActionFunction, json } from "react-router-dom";
import FormErrorResponse from "../entities/FormErrorResponse";
function RecoverPage() {
  return <Recover />;
}

export const action: ActionFunction = async (actionArgs) => {
  const { request } = actionArgs;
  // get the submitted form data
  const data = await request.formData();
  let url = "http://localhost:8080/reset";
  // get function gets the entered data for the corresponding input name
  // passed as parameter

  const email = data.get("email")!;
  const reqBody = {
    email: email,
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
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

  if (message === "user email not found") {
    const formErrorResponse: FormErrorResponse = {
      errorMessage: message,
      status: response.status,
    };
    return formErrorResponse;
  }

  return message;
};

export default RecoverPage;
