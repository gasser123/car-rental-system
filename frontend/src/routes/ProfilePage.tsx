import { LoaderFunction, json, useRouteLoaderData } from "react-router-dom";
import Profile from "../components/profile/Profile";
import isCustomerInfo, {
  CustomerInfo,
} from "../validations/customerInfoValidation";

function ProfilePage() {
  const data = useRouteLoaderData("profile-data");
  let customerInfo: CustomerInfo | null = null;
  if (isCustomerInfo(data)) {
    customerInfo = data;
  }
  return <Profile info={customerInfo} />;
}

export const loader: LoaderFunction = async () => {
  const response = await fetch("http://localhost:8080/profile", {
    method: "GET",
    credentials: "include",
  });
  const value = await response.json();
  if (!response.ok) {
    throw json({ message: value }, { status: response.status });
  }

  return value;
};

export default ProfilePage;
