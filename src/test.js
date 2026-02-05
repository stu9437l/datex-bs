import { ADToBS, BSToAD,isDateInSupportedRange } from "../dist/index.es.js";

console.log(ADToBS(new Date("1987-04-14")));
console.log(ADToBS("2026-02-05"));
console.log(ADToBS(new Date('2026-02-05')));


console.log(BSToAD("2082-11-22"));
console.log(BSToAD("2082-10-22"));
console.log(BSToAD("2082-02-01"));
console.log(BSToAD("2082-01-01"));



const isSupported1 = isDateInSupportedRange(new Date("2024-02-03"));
console.log(isSupported1); // true




