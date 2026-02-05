import { ADToBS, BSToAD,isDateInSupportedRange } from "../dist/index.es.js";

console.log(ADToBS(new Date("1987-04-14")));
console.log(ADToBS(new Date("2026-02-05")));

console.log(BSToAD("2076-05-08"));
// console.log(formatBS(ADToBS(new Date("2024-01-01"))));
// console.log({getSupportedDateRange:getSupportedDateRange()})

const isSupported1 = isDateInSupportedRange(new Date("2024-02-03"));
console.log(isSupported1); // true




