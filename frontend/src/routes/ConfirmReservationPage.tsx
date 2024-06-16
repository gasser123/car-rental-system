import { ActionFunction, LoaderFunction, json } from "react-router-dom";

function ConfirmReservationPage() {
  return <></>;
}

export const loader: LoaderFunction = () => {
  throw json({ message: "page not found" }, { status: 404 });
};

export const action: ActionFunction = async (actionArgs) => {
  const { params } = actionArgs;
  const id = params.id;
  if (!id) {
    throw json({ message: "resource not found" }, { status: 404 });
  }
  const url = `http://localhost:8080/reservations/${id}/confirm`;
  const response = await fetch(url, {
    method: "PATCH",
    credentials: "include",
  });
  const message = await response.json();
  if (!response.ok) {
    throw json({ message: message }, { status: response.status });
  }

  return message;
};

export default ConfirmReservationPage;