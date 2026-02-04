import { BS_CALENDAR } from "../data/calender";
import {
  BASE_AD,
  BASE_BS,
  MAX_BS_YEAR,
  MIN_BS_YEAR,
} from "../data/defaultDate";
import { diffDays } from "../core/dayCounter";
import type { BSDate } from "../types";

export const ADToBS = (ad: string | Date): string => {
  let adDate: Date;

  if (typeof ad === "string") {
    const [year, month, day] = ad.split("-").map(Number);

    if (!year || !month || !day) {
      throw new Error(`Invalid AD date format. Expected YYYY-MM-DD`);
    }

    // JS Date month is 0-based
    adDate = new Date(year, month - 1, day);
  } else {
    adDate = ad;
  }

  const { year, month, day } = convertADToBS(adDate);

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

const convertADToBS = (adDate: Date): BSDate => {
  const totalDays = diffDays(BASE_AD, adDate);

  if (totalDays === 0) {
    return { ...BASE_BS };
  }

  let { year, month, day } = BASE_BS;
  let remainingDays = totalDays;

  if (remainingDays < 0) {
    remainingDays = Math.abs(remainingDays);

    while (remainingDays > 0) {
      if (year <= MIN_BS_YEAR && month === 1 && day === 1) {
        throw new Error(
          `Date is out of range. Minimum supported BS year is ${MIN_BS_YEAR}`,
        );
      }

      day--;
      if (day < 1) {
        month--;
        if (month < 1) {
          month = 12;
          year--;
        }

        if (!BS_CALENDAR[year]) {
          throw new Error(
            `BS year ${year} not found in calendar. Supported range: ${MIN_BS_YEAR}-${MAX_BS_YEAR}`,
          );
        }

        day = BS_CALENDAR[year][month - 1];
      }
      remainingDays--;
    }

    return { year, month, day };
  }

  while (remainingDays > 0) {
    if (!BS_CALENDAR[year]) {
      throw new Error(
        `BS year ${year} not found in calendar. Supported range: ${MIN_BS_YEAR}-${MAX_BS_YEAR}`,
      );
    }

    const yearDays = BS_CALENDAR[year].reduce((sum, days) => sum + days, 0);

    if (remainingDays >= yearDays) {
      remainingDays -= yearDays;
      year++;

      if (year > MAX_BS_YEAR) {
        throw new Error(
          `Date is out of range. Maximum supported BS year is ${MAX_BS_YEAR}`,
        );
      }
      continue;
    }

    const monthDays = BS_CALENDAR[year][month - 1];
    const daysLeftInMonth = monthDays - day + 1;

    if (remainingDays >= daysLeftInMonth) {
      remainingDays -= daysLeftInMonth;
      day = 1;
      month++;

      if (month > 12) {
        month = 1;
        year++;
      }
      continue;
    }

    day += remainingDays;
    remainingDays = 0;
  }

  return { year, month, day };
};
