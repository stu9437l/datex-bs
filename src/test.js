import { adToBs, bsToAd, formatBS,getSupportedDateRange,isDateInSupportedRange } from "../dist/index.es.js";

// console.log(adToBs(new Date("2025-02-03")));
// console.log(bsToAd({ year: 2080, month: 9, day: 16 }));
// console.log(formatBS(adToBs(new Date("2024-01-01"))));
console.log({getSupportedDateRange:getSupportedDateRange()})

const isSupported1 = isDateInSupportedRange(new Date("2024-02-03"));
console.log(isSupported1); // true
