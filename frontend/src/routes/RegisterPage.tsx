import RegisterForm from "../components/register-form/RegisterForm";
import { ActionFunction, json, redirect } from "react-router-dom";
import Customer from "../entities/customerEntity";
import FormErrorResponse from "../entities/FormErrorResponse";

function RegisterPage() {
  return <RegisterForm />;
}

export const action: ActionFunction = async (actionArgs) => {
  const { request } = actionArgs;
  // get the submitted form data
  const data = await request.formData();
  let url = "http://localhost:8080/register";
  // get function gets the entered data for the corresponding input name
  // passed as parameter
  const customer: Customer = {
    email: data.get("email") as string,
    password: data.get("password") as string,
    first_name: data.get("first_name") as string,
    last_name: data.get("last_name") as string,
    mobile_no: data.get("mobile_no") as string,
    driver_license_no: data.get("driver_license_no") as string,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(customer),
  });
  const message = await response.json();
  if (
    response.status === 422 ||
    message === "email is already used" ||
    message === "license is already used"
  ) {
    const formErrorResponse: FormErrorResponse = {
      errorMessage: message,
      status: response.status,
    };
    return formErrorResponse;
  }
  if (!response.ok) {
    const errorMessage = await response.json();
    throw json({ message: errorMessage }, { status: response.status });
  }

  return redirect("/activation");
};

export default RegisterPage;
