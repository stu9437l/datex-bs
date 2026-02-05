import {
  BASE_AD,
  BASE_BS,
  MAX_BS_YEAR,
  MIN_BS_YEAR,
} from "../data/defaultDate";
import type { BSDate } from "../types";
import { calculateDaysBetweenBS, isValidBSDate } from "../utils/bs";

export const BSToAD = (bsDate: string): string => {
  const [year, month, day] = bsDate.split("-").map(Number);

  if (!year || !month || !day) {
    throw new Error(`Invalid BS date format. Expected YYYY-MM-DD`);
  }

  const bs: BSDate = { year, month, day };

  return convertBSToAD(bs);
};

const convertBSToAD = (bs: BSDate): string => {
  if (!isValidBSDate(bs)) {
    throw new Error(
      `Invalid BS date: ${bs.year}-${bs.month}-${bs.day}. ` +
        `Supported year range: ${MIN_BS_YEAR}-${MAX_BS_YEAR}, ` +
        `month range: 1-12`,
    );
  }

  const totalDays = calculateDaysBetweenBS(BASE_BS, bs);

  console.log("BASE_BS:", BASE_BS);
  console.log("Target BS:", bs);
  console.log("Total days calculated:", totalDays);

  const baseDate = new Date(BASE_AD);

  const baseTimestamp = Date.UTC(
    baseDate.getUTCFullYear(),
    baseDate.getUTCMonth(),
    baseDate.getUTCDate(),
  );

  const resultTimestamp = baseTimestamp + totalDays * 24 * 60 * 60 * 1000;

  const resultDate = new Date(resultTimestamp);
  resultDate.setUTCHours(0, 0, 0, 0);

  console.log({ resultTimestamp });

  return resultDate.toISOString().split("T")[0];
};
