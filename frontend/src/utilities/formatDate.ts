export function formatDate(date: Date): string {
  // Extract date components
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format the components to ensure two digits for day, month, hours, minutes, and seconds
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  // Construct the formatted date string
  return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
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

  // Return the ISO string representation of the date
  return isoString;
}
