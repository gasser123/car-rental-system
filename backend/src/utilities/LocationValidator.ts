import { isString } from "./typeValidation";
class LocationValidator{
    validateInput(value: unknown): boolean {
        if (!value) {
          return false;
        }
        const checkType = isString(value);
        if (!checkType) {
          return false;
        }
    
        const location = value as string;
        if (location.trim() === "") {
          return false;
        }
    
        return true;
      }

 
}

export default LocationValidator;