export type status = "Available" | "Rented" | "Out of service";
interface Car {
  id?: number;
  plate_id: string;
  model: string;
  year: string;
  status: status;
  price_per_day: number;
  country: string;
  color: string;
  image_url: string;
}

export default Car;
