import PickupLocation from "./pickupLocationEntity";
import ReturnLocation from "./returnLocationEntity";
import Car from "./carEntity";
interface ReservationLoaderResponse{
    pickupLocation: PickupLocation;
    returnLocation: ReturnLocation;
    car: Car
}

export default ReservationLoaderResponse;