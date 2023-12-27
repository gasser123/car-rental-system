type status = "Available" | "Rented" | "Out of service";
export interface Car {
  id?: number;
  plate_id: string;
  model: string;
  year: string;
  status: status;
  price_per_day: number;
  country: string;
  color: string;
}
