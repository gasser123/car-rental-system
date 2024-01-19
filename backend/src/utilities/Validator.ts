import { isString } from "./typeValidation";
class Validator {
  email: RegExp;
  password: RegExp;
  /*
    password:
    - at least 8 characters
    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
    - Can contain special characters
    */

  constructor() {
    this.email = new RegExp(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    );
    this.password = new RegExp(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    );
  }

  validateName(value: unknown): boolean {
    if(!value){
      return false;
    }
    const checkType = isString(value);
    if(!checkType){
     return false;
    }
    const name = value as string;
    if (name.trim() === "") {
      return false;
    } else {
      return true;
    }
  }
  validateEmail(value: unknown): boolean {
    if(!value){
      return false;
    }
    const checkType = isString(value);
    if(!checkType){
     return false;
    }
    const inputEmail = value as string;
    return this.email.test(inputEmail);
  }
  validatePassword(value: unknown): boolean {
    if(!value){
      return false;
    }
    const checkType = isString(value);
    if(!checkType){
     return false;
    }
    const inputPassword = value as string;
    return this.password.test(inputPassword);
  }

  validateLicense(value: unknown): boolean {
    if(!value){
      return false;
    }
    const checkType = isString(value);
    if(!checkType){
     return false;
    }
    const license = value as string;
    if (license.trim() === "") {
      return false;
    } else {
      return true;
    }
  }
  validateMobileNo(value: unknown): boolean {
    if(!value){
      return false;
    }
    const checkType = isString(value);
    if(!checkType){
     return false;
    }
    const mobile_no = value as string;
    if (mobile_no.trim() === "") {
      return false;
    } else {
      return true;
    }
  }
}
export default Validator;
