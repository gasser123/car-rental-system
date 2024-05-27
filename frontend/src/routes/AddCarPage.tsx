import { ActionFunction, json, redirect } from "react-router-dom";
import AddCar from "../components/dashboard/cars/AddCar";
import Car from "../entities/carEntity";
import { status } from "../entities/carEntity";
import FormErrorResponse from "../entities/FormErrorResponse";
function AddCarPage() {
  return <AddCar />;
}

export const action: ActionFunction = async (actionArgs) => {
  const { request } = actionArgs;
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
  const url = "http://localhost:8080/cars";

  const response = await fetch(url, {
    method: "POST",
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

export default AddCarPage;
