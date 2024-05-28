import {
  LoaderFunction,
  json,
  useLoaderData,
  redirect,
  ActionFunction,
} from "react-router-dom";
import EditCar from "../components/dashboard/cars/EditCar";
import { isCar } from "../validations/carResponseValidations";
import FormErrorResponse from "../entities/FormErrorResponse";
import Car, { status } from "../entities/carEntity";
function EditCarPage() {
  const data = useLoaderData();
  const dataIsCar = isCar(data);
  return dataIsCar ? <EditCar car={data} /> : <></>;
}

export const loader: LoaderFunction = async (loaderArgs) => {
  const { params } = loaderArgs;
  const idParam = params.id;
  if (!idParam) {
    throw json({ message: "not found" }, { status: 404 });
  }

  const id = parseInt(idParam);
  const url = `http://localhost:8080/cars/${id}`;
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
  const car: Car = {
    plate_id: data.get("plate_id") as string,
    model: data.get("model") as string,
    year: data.get("year") as string,
    status: data.get("status") as status,
    color: data.get("color") as string,
    country: data.get("country") as string,
    image_url: data.get("image_url") as string,
    price_per_day: parseFloat(data.get("price_per_day") as string),
  };
  const url = `http://localhost:8080/cars/${id}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(car),
  });

  const resData = await response.json();
  if (response.status === 422 || resData === "plate id is already used") {
    const formErrorResponse: FormErrorResponse = {
      errorMessage: resData,
      status: response.status,
    };
    return formErrorResponse;
  }
  if (!response.ok) {
    throw json({ message: resData }, { status: response.status });
  }

  return redirect("/dashboard/cars");
};

export default EditCarPage;
