import PickupLocation from "../entities/pickupLocationEntity";
export function isPickupLocation(value: unknown): value is PickupLocation {
    if (
      value &&
      typeof value === "object" &&
      "id" in value &&
      typeof value.id === "number" &&
      "country" in value &&
      typeof value.country === "string" &&
      "city" in value &&
      typeof value.city === "string" &&
      "address" in value &&
      typeof value.address === "string" 
    ) {
      return true;
    }
  
    return false;
  }
  
  function isArrayOfPickupLocations(value: unknown): value is PickupLocation[] {
    if (Array.isArray(value) && value.every((element) => isPickupLocation(element))) {
      return true;
    }
  
    return false;
  }
  
  export default isArrayOfPickupLocations;