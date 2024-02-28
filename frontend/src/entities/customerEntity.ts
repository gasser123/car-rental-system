interface Customer {
  id?: number;
  driver_license_no: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile_no: string;
  verified?: number;
}
export default Customer;
