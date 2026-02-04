import {
  BASE_AD,
  BASE_BS,
  MAX_BS_YEAR,
  MIN_BS_YEAR,
} from "../data/defaultDate";
import type { BSDate } from "../types";
import { calculateDaysBetweenBS, isValidBSDate } from "../utils/bs";

export const BSToAD = (bsDate: string): Date => {
  const [year, month, day] = bsDate.split("-").map(Number);

  if (!year || !month || !day) {
    throw new Error(`Invalid BS date format. Expected YYYY-MM-DD`);
  }

  const bs: BSDate = { year, month, day };

  return convertBSToAD(bs);
};

const convertBSToAD = (bs: BSDate): Date => {
  if (!isValidBSDate(bs)) {
    throw new Error(
      `Invalid BS date: ${bs.year}-${bs.month}-${bs.day}. ` +
        `Supported year range: ${MIN_BS_YEAR}-${MAX_BS_YEAR}, ` +
        `month range: 1-12`,
    );
  }

  const totalDays = calculateDaysBetweenBS(BASE_BS, bs);

  const result = new Date(BASE_AD);
  result.setDate(result.getDate() + totalDays);
  return result;
};
