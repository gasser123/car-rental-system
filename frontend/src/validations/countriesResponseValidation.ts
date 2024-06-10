import Countries, { Country } from "../entities/Countries";
export function isCountry(value: unknown): value is Country {
  return value &&
    typeof value === "object" &&
    "country" in value &&
    typeof value.country === "string"
    ? true
    : false;
}

function isCountries(value: unknown): value is Countries {
  return value &&
    Array.isArray(value) &&
    value.every((element) => isCountry(element))
    ? true
    : false;
}
export default isCountries;
