import ReturnLocation from "../entities/returnLocationEntity";
export function isReturnLocation(value: unknown): value is ReturnLocation {
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
  
  function isArrayOfReturnLocations(value: unknown): value is ReturnLocation[] {
    if (Array.isArray(value) && value.every((element) => isReturnLocation(element))) {
      return true;
    }
  
    return false;
  }
  
  export default isArrayOfReturnLocations;