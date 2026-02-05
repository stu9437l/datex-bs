import { BS_CALENDAR } from "../data/calender";
import { MAX_BS_YEAR, MIN_BS_YEAR } from "../data/defaultDate";
import type { BSDate } from "../types";

export const calculateDaysBetweenBS = (from: BSDate, to: BSDate): number => {
  if (from.year === to.year && from.month === to.month && from.day === to.day) {
    return 0;
  }

  const isForward =
    to.year > from.year ||
    (to.year === from.year && to.month > from.month) ||
    (to.year === from.year && to.month === from.month && to.day > from.day);

  if (!isForward) {
    return -calculateDaysBetweenBS(to, from);
  }

  let days = 0;
  let y = from.year;
  let m = from.month;
  let d = from.day;

  // move day-by-day until target
  while (y !== to.year || m !== to.month || d !== to.day) {
    days++;
    d++;

    if (d > BS_CALENDAR[y][m - 1]) {
      d = 1;
      m++;
    }

    if (m > 12) {
      m = 1;
      y++;
    }
  }

  return days;
};

export const isValidBSDate = (bs: BSDate): boolean => {
  if (bs.year < MIN_BS_YEAR || bs.year > MAX_BS_YEAR) {
    return false;
  }
  if (bs.month < 1 || bs.month > 12) {
    return false;
  }

  if (!BS_CALENDAR[bs.year]) {
    return false;
  }
  const maxDaysInMonth = BS_CALENDAR[bs.year][bs.month - 1];
  if (bs.day < 1 || bs.day > maxDaysInMonth) {
    return false;
  }

  return true;
};

export const validateBSDate = (
  bs: BSDate,
): {
  valid: boolean;
  error?: string;
} => {
  if (bs.year < MIN_BS_YEAR || bs.year > MAX_BS_YEAR) {
    return {
      valid: false,
      error: `Year ${bs.year} is out of range. Supported: ${MIN_BS_YEAR}-${MAX_BS_YEAR}`,
    };
  }

  if (bs.month < 1 || bs.month > 12) {
    return {
      valid: false,
      error: `Month ${bs.month} is invalid. Must be between 1-12`,
    };
  }

  if (!BS_CALENDAR[bs.year]) {
    return {
      valid: false,
      error: `Year ${bs.year} not found in calendar`,
    };
  }

  const maxDaysInMonth = BS_CALENDAR[bs.year][bs.month - 1];
  if (bs.day < 1 || bs.day > maxDaysInMonth) {
    return {
      valid: false,
      error: `Day ${bs.day} is invalid for ${bs.year}/${bs.month}. Must be between 1-${maxDaysInMonth}`,
    };
  }

  return { valid: true };
};

export const getBSSupportedRange = (): {
  minYear: number;
  maxYear: number;
} => {
  return {
    minYear: MIN_BS_YEAR,
    maxYear: MAX_BS_YEAR,
  };
};
