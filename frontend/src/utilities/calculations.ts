export function daysBetweenDates(date1: string, date2: string):number{
    const isoDate1 = new Date(date1);
    const isoDate2 = new Date(date2);
  
    // Calculate the difference in milliseconds
    const timeDifference = Math.abs(isoDate2.getTime() - isoDate1.getTime());
  
    // Calculate the difference in days
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysDifference;
  }