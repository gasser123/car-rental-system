import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import UnconfirmedReservations from "../components/dashboard/reservations/UnconfirmedReservations";
import AdminReservationInfo from "../entities/AdminReservationInfo";
import isArrayOfAdminReservationInfo from "../validations/adminReservationInfoValidation";
function UnconfirmedReservationsPage() {
  const data = useLoaderData();
  let adminReservationsInfo: AdminReservationInfo[] | null = null;
  if (isArrayOfAdminReservationInfo(data)) {
    adminReservationsInfo = data;
  }
  return (
    <UnconfirmedReservations adminReservationsInfo={adminReservationsInfo} />
  );
}

export const loader: LoaderFunction = async () => {
  const url = "http://localhost:8080/reservations/unconfirmed";
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

export default UnconfirmedReservationsPage;
