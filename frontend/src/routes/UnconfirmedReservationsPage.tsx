import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import ReservationsInfo from "../components/dashboard/reservations/ReservationsInfo";
import AdminReservationInfo from "../entities/AdminReservationInfo";
import isArrayOfAdminReservationInfo from "../validations/adminReservationInfoValidation";
function UnconfirmedReservationsPage() {
  const data = useLoaderData();
  let adminReservationsInfo: AdminReservationInfo[] | null = null;
  if (isArrayOfAdminReservationInfo(data)) {
    adminReservationsInfo = data;
  }
  return (
    <ReservationsInfo adminReservationsInfo={adminReservationsInfo} />
  );
}

export const loader: LoaderFunction = async (loaderArgs) => {
  const {request} = loaderArgs;
  const requestURL = new URL(request.url);
  const searchTermValue = requestURL.searchParams.get("search");
  let url = "http://localhost:8080/reservationsinfo/unconfirmed";
  if(searchTermValue){
    url = `http://localhost:8080/reservationsinfo/unconfirmed?search=${searchTermValue}`;
   }
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
