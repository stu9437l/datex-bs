import type { BSDate } from "../types";
import { BS_CALENDAR } from "./calender";

export const BASE_AD = new Date("1943-04-14");
export const BASE_BS: BSDate = { year: 2000, month: 1, day: 1 };

export const MIN_BS_YEAR = Math.min(...Object.keys(BS_CALENDAR).map(Number));
export const MAX_BS_YEAR = Math.max(...Object.keys(BS_CALENDAR).map(Number));
