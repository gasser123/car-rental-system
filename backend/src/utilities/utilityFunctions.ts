export function daysBetweenDates(date1: string, date2: string): number {
  const isoDate1 = new Date(date1);
  const isoDate2 = new Date(date2);

  // Calculate the difference in milliseconds
  const timeDifference = Math.abs(isoDate2.getTime() - isoDate1.getTime());

  // Calculate the difference in days
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

export function convertLocalToUTC(value: string) {
  const date = new Date(value);
  return new Date(date.toISOString()).toISOString();
}

export function convertUTCtoLocalTime(value: string, timeZone: string) {
  const utcDate = new Date(value);
  return new Date(utcDate.toLocaleString("en-US", { timeZone })).toISOString();
}

export function convertJSDateToMysqlDateTime(value: string) {
  const jsDate = new Date(value);

  // Pad single digit numbers with leading zero
  const pad = (number: number) => (number < 10 ? "0" : "") + number;

  // Get date and time components
  const year = jsDate.getFullYear();
  const month = pad(jsDate.getMonth() + 1); // Months are zero-indexed in JS
  const day = pad(jsDate.getDate());
  const hours = pad(jsDate.getHours());
  const minutes = pad(jsDate.getMinutes());
  const seconds = pad(jsDate.getSeconds());

  // Construct the MySQL datetime string
  const mysqlDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return mysqlDateTime;
}

export function convertMysqlDateTimeToIsoString(mysqlDateTime: string) {
  // Replace space with 'T' and append 'Z' to indicate UTC
  const isoString = mysqlDateTime.replace(" ", "T") + "Z";

  // Create a new Date object
  const jsDate = new Date(isoString);

  // Return the ISO string representation of the date
  return jsDate.toISOString();
}
