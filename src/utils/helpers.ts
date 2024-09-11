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
