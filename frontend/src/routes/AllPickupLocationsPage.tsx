import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import PickupLocation from "../entities/pickupLocationEntity";
import isArrayOfPickupLocations from "../validations/pickuplocationResponseValidation";
import LocationsInfo from "../components/dashboard/locations/LocationsInfo";
function AllPickupLocationsPage() {
  const data = useLoaderData();
  let locations: PickupLocation[] | null = null;
  if (isArrayOfPickupLocations(data)) {
    locations = data;
  }
  return <LocationsInfo locations={locations} />;
}

export const loader: LoaderFunction = async (loaderArgs) => {
  const {request} = loaderArgs;
  const requestURL = new URL(request.url);
  const searchTermValue = requestURL.searchParams.get("search");
  let url = "http://localhost:8080/pickuplocations/all";
  if(searchTermValue){
    url = `http://localhost:8080/pickuplocations-search?search=${searchTermValue}`;
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

export default AllPickupLocationsPage;