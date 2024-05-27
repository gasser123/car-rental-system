import Car from "../entities/carEntity";
export function isCar(value: unknown): value is Car {
  if (
    value &&
    typeof value === "object" &&
    "id" in value &&
    typeof value.id === "number" &&
    "plate_id" in value &&
    typeof value.plate_id === "string" &&
    "model" in value &&
    typeof value.model === "string" &&
    "year" in value &&
    typeof value.year === "string" &&
    "status" in value &&
    (value.status === "Available" ||
      value.status === "Rented" ||
      value.status === "Out of service") &&
    "price_per_day" in value &&
    typeof value.price_per_day === "number" &&
    "color" in value &&
    typeof value.color === "string" &&
    "image_url" in value &&
    typeof value.image_url === "string"
  ) {
    return true;
  }

  return false;
}

function isArrayOfCars(value: unknown): value is Car[] {
  if (Array.isArray(value) && value.every((element) => isCar(element))) {
    return true;
  }

  return false;
}

export default isArrayOfCars;
