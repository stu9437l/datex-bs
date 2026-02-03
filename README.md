# @urekasystems/datex-bs

A lightweight **Bikram Sambat (BS) / Nepali calendar utility library** for converting between **AD (Gregorian) and BS (Bikram Sambat)** dates in JavaScript/TypeScript.

---

## **Installation**

Using npm:

```bash
npm install @urekasystems/datex-bs
Using yarn:

yarn add @urekasystems/datex-bs
Features
Convert AD → BS

Convert BS → AD

Fully typed with TypeScript

Lightweight and dependency-free

Usage
Importing
import { convertADToBS, convertBSToAD } from "@urekasystems/datex-bs";
Convert AD to BS
const adDate = new Date("2026-02-03");
const bsDate = convertADToBS(adDate);

console.log(bsDate);
// Output example: { year: 2082, month: 10, day: 21 }
Convert BS to AD
const bsDate = { year: 2082, month: 10, day: 21 };
const adDate = convertBSToAD(bsDate);

console.log(adDate);
// Output example: Date object: 2026-02-03
TypeScript Support
import type { BSDate } from "@urekasystems/datex-bs";

const date: BSDate = { year: 2082, month: 10, day: 21 };
```
