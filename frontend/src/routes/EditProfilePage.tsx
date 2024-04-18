import EditProfile from "../components/profile/EditProfile";
import { useRouteLoaderData, ActionFunction, json, redirect } from "react-router-dom";
import isCustomerInfo, {
  CustomerInfo,
} from "../validations/customerInfoValidation";
import ProfileData from "../entities/ProfileData";
import FormErrorResponse from "../entities/FormErrorResponse";
function EditProfilePage() {
  const data = useRouteLoaderData("profile-data");
  let customerInfo: CustomerInfo | null = null;
  if (isCustomerInfo(data)) {
    customerInfo = data;
  }

  return <EditProfile info={customerInfo} />;
}

export const action: ActionFunction = async (actionArgs) => {
  const { request } = actionArgs;
  // get the submitted form data
  const data = await request.formData();
  let url = "http://localhost:8080/profile";
  // get function gets the entered data for the corresponding input name
  // passed as parameter
  const profileData: ProfileData= {
    first_name: data.get("first_name") as string,
    last_name: data.get("last_name") as string,
    mobile_no: data.get("mobile_no") as string,
    driver_license_no: data.get("driver_license_no") as string,
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
  if (
    response.status === 422 ||
    message === "license is already used"
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
export default EditProfilePage;
