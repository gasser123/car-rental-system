import { isNumber } from "./typeValidation";

function isValidId(id: number) {
  if (!id) {
    return false;
  }

  const checkType = isNumber(id);
  if (!checkType) {
    return false;
  }

  const check = isNaN(id);
  if (check) {
    return false;
  }
  return true;
}

export default isValidId;
