export function isNumber(value: unknown): boolean {
  if (typeof value === "number") {
    return true;
  }

  return false;
}

export function isString(value: unknown): boolean {
  if (typeof value === "string") {
    return true;
  }

  return false;
}

export function isBoolean(value: unknown): boolean {
  if (typeof value === "boolean") {
    return true;
  }

  return false;
}

export function isValidDate(value: string): boolean {
  const date = new Date(value);
  const time = date.getTime();
  if (time) {
    return true;
  }

  return false;
}
