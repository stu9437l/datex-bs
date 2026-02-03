import { BS_CALENDAR } from "../data/calender";
import type { BSDate } from "../types";

const BASE_AD = new Date("2023-04-14");
const BASE_BS: BSDate = { year: 2080, month: 1, day: 1 };

export function convertBSToAD(bs: BSDate): Date {
  const totalDays = calculateDaysBetweenBS(BASE_BS, bs);

  const result = new Date(BASE_AD);
  result.setDate(result.getDate() + totalDays);
  return result;
}

function calculateDaysBetweenBS(from: BSDate, to: BSDate): number {
  // Handle same date
  if (from.year === to.year && from.month === to.month && from.day === to.day) {
    return 0;
  }

  // Determine direction
  const isForward =
    to.year > from.year ||
    (to.year === from.year && to.month > from.month) ||
    (to.year === from.year && to.month === from.month && to.day > from.day);

  if (!isForward) {
    return -calculateDaysBetweenBS(to, from);
  }

  let days = 0;
  let { year, month, day } = from;

  days += BS_CALENDAR[year][month - 1] - day;
  month++;

  while (year < to.year) {
    if (month > 12) {
      month = 1;
      year++;
      continue;
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

  while (month < to.month) {
    days += BS_CALENDAR[year][month - 1];
    month++;
  }

  days += to.day;

  return days;
}
