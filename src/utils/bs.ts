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
  let { year, month, day } = from;

  if (!BS_CALENDAR[year]) {
    throw new Error(
      `BS year ${year} not found in calendar. Supported range: ${MIN_BS_YEAR}-${MAX_BS_YEAR}`,
    );
  }

  days += BS_CALENDAR[year][month - 1] - day;
  month++;

  while (year < to.year) {
    if (month > 12) {
      month = 1;
      year++;
      continue;
    }

    if (!BS_CALENDAR[year]) {
      throw new Error(
        `BS year ${year} not found in calendar. Supported range: ${MIN_BS_YEAR}-${MAX_BS_YEAR}`,
      );
    }

    if (year < to.year - 1 || (year === to.year - 1 && month === 1)) {
      days += BS_CALENDAR[year].reduce((sum, monthDays) => sum + monthDays, 0);
      year++;
      month = 1;
    } else {
      days += BS_CALENDAR[year][month - 1];
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  if (!BS_CALENDAR[year]) {
    throw new Error(
      `BS year ${year} not found in calendar. Supported range: ${MIN_BS_YEAR}-${MAX_BS_YEAR}`,
    );
  }

  while (month < to.month) {
    days += BS_CALENDAR[year][month - 1];
    month++;
  }

  days += to.day;

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
