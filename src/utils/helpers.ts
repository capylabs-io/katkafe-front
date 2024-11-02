import moment from "moment";

export const waitForSeconds = async (seconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const ordinalSuffix = (value: number) => {
  let suffix = ["th", "st", "nd", "rd"],
    v = value % 100;
  return value + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
};

export const secondsToMinutes = (seconds: number) => {
  return Math.floor(seconds / 60);
};

export const secondsToHours = (seconds: number) => {
  return Math.floor(seconds / 3600);
};

export const formatStringNumber = (number: string, fixed = 0) => {
  const units = ["K", "M", "B", "T"];
  const unit = Math.floor((Number(number).toFixed(0).length - 1) / 3);
  const num = Number(number) / Math.pow(1000, unit);

  return unit ? num.toFixed(fixed) + units[unit - 1] : number.toString();
};

export const isoStringToDateTimeString = (
  isoString: string,
  format = "YYYY-MM-DD HH:mm:ss"
) => {
  const date = moment(isoString).utc();
  return date.format(format);
};

export const getOffsetByLocation = (currentLocation: number) => {
  switch (currentLocation) {
    default:
    case 1:
    case 2:
    case 3:
      return 64;
    case 4:
      return 8;
  }
};

export function timeAgo(isoString: string): string {
  const date = new Date(isoString); // Parse the ISO string into a Date object
  const now = new Date();

  // Calculate time differences
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  // Return formatted string based on time difference
  if (seconds < 60) {
    return seconds <= 10 ? "now" : `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else if (hours < 24) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (days < 30) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (months < 12) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  }
}
export const sliceString = (
  input: string,
  startCharacter: number = 8,
  endCharacter: number = 6
): string => {
  if (startCharacter < 0 || startCharacter >= input.length) {
    console.log("startCharacter is out of bounds.");
    return input;
  }

  const startSlice = input.slice(0, startCharacter);
  const endSlice =
    endCharacter !== undefined && endCharacter < input.length
      ? input.slice(-endCharacter)
      : input.slice(-4); // Default to last 4 characters if endCharacter is not provided

  return `${startSlice}...${endSlice}`;
};
