import { ActionFunction, json, redirect } from "react-router-dom";
import AddLocation from "../components/dashboard/locations/AddLocation";
import PickupLocation from "../entities/pickupLocationEntity";
import FormErrorResponse from "../entities/FormErrorResponse";
function AddPickupLocationPage() {
  return <AddLocation />;
}

export const action: ActionFunction = async (actionArgs) => {
  const { request } = actionArgs;
  const data = await request.formData();
  const location: PickupLocation = {
    country: data.get("country") as string,
    city: data.get("city") as string,
    address: data.get("address") as string,
  };
  const url = "http://localhost:8080/pickuplocations";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(location),
  });

  const resData = await response.json();
  if (response.status === 422 || resData === "location already exists") {
    const formErrorResponse: FormErrorResponse = {
      errorMessage: resData,
      status: response.status,
    };
    return formErrorResponse;
  }
  if (!response.ok) {
    throw json({ message: resData }, { status: response.status });
  }

  return redirect("/dashboard/pickuplocations");
};

export default AddPickupLocationPage;