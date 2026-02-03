import type { BSDate } from "../types";

export const formatBS = (bs: BSDate): string => {
  return `${bs.year}-${String(bs.month).padStart(2, "0")}-${String(bs.day).padStart(2, "0")}`;
};

export const parseBS = (input: string): BSDate => {
  const [y, md, d] = input.split("-").map(Number);
  return { year: y, month: md, day: d };
};
