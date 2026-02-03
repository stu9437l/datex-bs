import { BS_CALENDAR } from "../data/calender";
import { BASE_AD, BASE_BS } from "../data/defaultDate";
import { diffDays } from "../core/dayCounter";
import type { BSDate } from "../types";

export function convertADToBS(adDate: Date): BSDate {
  const totalDays = diffDays(BASE_AD, adDate);

  if (totalDays === 0) {
    return { ...BASE_BS };
  }

  let { year, month, day } = BASE_BS;
  let remainingDays = totalDays;

  if (remainingDays < 0) {
    remainingDays = Math.abs(remainingDays);

    while (remainingDays > 0) {
      day--;
      if (day < 1) {
        month--;
        if (month < 1) {
          month = 12;
          year--;
        }
        day = BS_CALENDAR[year][month - 1];
      }
      remainingDays--;
    }

    return { year, month, day };
  }

  while (remainingDays > 0) {
    const yearDays = BS_CALENDAR[year].reduce((sum, days) => sum + days, 0);

    if (remainingDays >= yearDays) {
      remainingDays -= yearDays;
      year++;
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
}
