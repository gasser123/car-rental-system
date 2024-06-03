import {
  LoaderFunction,
  json,
  useLoaderData,
  redirect,
  ActionFunction,
} from "react-router-dom";
import EditLocation from "../components/dashboard/locations/EditLocation";
import { isPickupLocation } from "../validations/pickuplocationResponseValidation";
import FormErrorResponse from "../entities/FormErrorResponse";
import PickupLocation from "../entities/pickupLocationEntity";
function EditPickupLocationPage() {
  const data = useLoaderData();
  const dataIsLocation = isPickupLocation(data);
  return dataIsLocation ? <EditLocation location={data} /> : <></>;
}

export const loader: LoaderFunction = async (loaderArgs) => {
  const { params } = loaderArgs;
  const idParam = params.id;
  if (!idParam) {
    throw json({ message: "not found" }, { status: 404 });
  }

  const id = parseInt(idParam);
  const url = `http://localhost:8080/pickuplocations/${id}`;
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const resData = await response.json();
  if (!response.ok) {
    throw json(
      { message: resData ? resData : response.statusText },
      { status: response.status }
    );
  }

  return resData;
};

export const action: ActionFunction = async (actionArgs) => {
  const { request, params } = actionArgs;
  const idParam = params.id;
  if (!idParam) {
    throw json({ message: "not found" }, { status: 404 });
  }
  const id = parseInt(idParam);
  const data = await request.formData();
  const location: PickupLocation = {
    country: data.get("country") as string,
    city: data.get("city") as string,
    address: data.get("address") as string,
  };
  const url = `http://localhost:8080/pickuplocations?id=${id}`;

  const response = await fetch(url, {
    method: "PATCH",
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

export default EditPickupLocationPage;
