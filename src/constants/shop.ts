import moment from "moment";

export const STARTER_DATE =
  process.env.NEXT_PUBLIC_STARTER_PACK_TIME ||
  moment().startOf("days").format("YYYY-MM-DD");
