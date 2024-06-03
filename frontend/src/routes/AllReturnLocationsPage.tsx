import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import ReturnLocation from "../entities/returnLocationEntity";
import isArrayOfReturnLocations from "../validations/returnLocationResponseValidation";
import LocationsInfo from "../components/dashboard/locations/LocationsInfo";
function AllReturnLocationsPage() {
  const data = useLoaderData();
  let locations: ReturnLocation[] | null = null;
  if (isArrayOfReturnLocations(data)) {
    locations = data;
  }
  return <LocationsInfo locations={locations} />;
}

export const loader: LoaderFunction = async () => {
  const url = "http://localhost:8080/returnlocations/all";
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

export default AllReturnLocationsPage;