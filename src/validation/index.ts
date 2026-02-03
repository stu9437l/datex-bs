import { BS_CALENDAR } from "../data/calender";
import type { BSDate } from "../types";

export const isValidBS = (bs: BSDate): boolean => {
  const months = BS_CALENDAR[bs.year];
  if (!months) return false;
  if (bs.month < 1 || bs.month > 12) return false;
  if (bs.day < 1 || bs.day > months[bs.month - 1]) return false;
  return true;
};
