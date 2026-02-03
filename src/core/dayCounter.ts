export const diffDays = (from: Date, to: Date) => {
  const ONE_DAY = 24 * 60 * 60 * 1000;
  return Math.floor((to.getTime() - from.getTime()) / ONE_DAY);
};
