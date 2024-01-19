import { isString, isNumber } from "./typeValidation";
import { status } from "../entities/carEntity";
import { URL } from "url";
class CarValidator {
  yearRegExp: RegExp;
  constructor() {
    this.yearRegExp = new RegExp(/^\d{4}$/);
  }

  validatePlate(value: unknown): boolean {
    if (!value) {
      return false;
    }
    const checkType = isString(value);
    if (!checkType) {
      return false;
    }
    const plate_id = value as string;
    if (plate_id.trim() === "") {
      return false;
    }

    return true;
  }

  validateModel(value: unknown): boolean {
    if (!value) {
      return false;
    }
    const checkType = isString(value);
    if (!checkType) {
      return false;
    }
    const model = value as string;
    if (model.trim() === "") {
      return false;
    }

    return true;
  }

  validateYear(value: unknown): boolean {
    if (!value) {
      return false;
    }
    const checkType = isString(value);
    if (!checkType) {
      return false;
    }
    const year = value as string;
    const check = this.yearRegExp.test(year);
    if (!check) {
      return false;
    }

    return true;
  }

  validateStatus(value: unknown): boolean {
    if (!value) {
      return false;
    }

    const checkType = isString(value);
    if (!checkType) {
      return false;
    }
    const status = value as status;
    if (
      status === "Available" ||
      status === "Out of service" ||
      status === "Rented"
    ) {
      return true;
    }

    return false;
  }

  validatePrice(value: unknown): boolean {
    if (!value) {
      return false;
    }

    const checkType = isNumber(value);
    if (!checkType) {
      return false;
    }
    const price_per_day = value as number;
    if (price_per_day <= 0) {
      return false;
    }

    return true;
  }

  validateCountry(value: unknown): boolean {
    if (!value) {
      return false;
    }
    const checkType = isString(value);
    if (!checkType) {
      return false;
    }

    const country = value as string;
    if (country.trim() === "") {
      return false;
    }

    return true;
  }

  validateColor(value: unknown): boolean {
    if (!value) {
      return false;
    }
    const checkType = isString(value);
    if (!checkType) {
      return false;
    }

    const color = value as string;
    if (color.trim() === "") {
      return false;
    }

    return true;
  }

  validateURL(value: unknown): boolean {
    try {
      if (!value) {
        return false;
      }
      const checkType = isString(value);
      if (!checkType) {
        return false;
      }

      const input = value as string;
      new URL(input);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default CarValidator;
