import { ADToBS } from "../core/adToBs";
import { BS_CALENDAR } from "../data/calender";
import {
  BASE_AD,
  BASE_BS,
  MAX_BS_YEAR,
  MIN_BS_YEAR,
} from "../data/defaultDate";

export const isDateInSupportedRange = (adDate: Date): boolean => {
  try {
    ADToBS(adDate);
    return true;
  } catch {
    return false;
  }
};

export const calculateDaysFromBSYearToBase = (targetYear: number): number => {
  let days = 0;
  for (let y = targetYear; y < BASE_BS.year; y++) {
    if (BS_CALENDAR[y]) {
      days += BS_CALENDAR[y].reduce((sum, d) => sum + d, 0);
    }
  }
  return days;
};

export const calculateDaysFromBaseToMaxYear = (targetYear: number): number => {
  let days = 0;
  for (let y = BASE_BS.year; y <= targetYear; y++) {
    if (BS_CALENDAR[y]) {
      days += BS_CALENDAR[y].reduce((sum, d) => sum + d, 0);
    }
  }
  return days;
};

export const getSupportedDateRange = (): {
  minYear: number;
  maxYear: number;
  minAD: Date;
  maxAD: Date;
} => {
  const daysFrom1970ToBase = calculateDaysFromBSYearToBase(MIN_BS_YEAR);
  const minAD = new Date(BASE_AD);
  minAD.setDate(minAD.getDate() - daysFrom1970ToBase);

  const daysFromBaseToMax = calculateDaysFromBaseToMaxYear(MAX_BS_YEAR);
  const maxAD = new Date(BASE_AD);
  maxAD.setDate(maxAD.getDate() + daysFromBaseToMax);

  return {
    minYear: MIN_BS_YEAR,
    maxYear: MAX_BS_YEAR,
    minAD,
    maxAD,
  };
};
