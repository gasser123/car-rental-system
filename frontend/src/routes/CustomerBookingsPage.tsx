import CustomerBookings from "../components/customer-bookings/CustomerBookings";
import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import CustomerReservation from "../entities/customerReservation";
function CustomerBookingsPage() {
  const data = useLoaderData();
  let customerReservationsInfo = data as CustomerReservation[];
  return <CustomerBookings customerReservationsInfo={customerReservationsInfo} />;
}

export const loader: LoaderFunction = async (loaderArgs) => {
  const url = "http://localhost:8080/customer-reservations";
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

export default CustomerBookingsPage;
