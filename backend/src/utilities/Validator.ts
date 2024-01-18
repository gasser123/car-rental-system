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

  validateName(name: string): boolean {
    if (name.trim() === "") {
      return false;
    } else {
      return true;
    }
  }
  validateEmail(inputEmail: string): boolean {
    return this.email.test(inputEmail);
  }
  validatePassword(inputPassword: string): boolean {
    return this.email.test(inputPassword);
  }

  validateLicense(license: string): boolean {
    if (license.trim() === "") {
      return false;
    } else {
      return true;
    }
  }
  validateMobileNo(mobile_no: string): boolean {
    if (mobile_no.trim() === "") {
      return false;
    } else {
      return true;
    }
  }
}
export default Validator;
