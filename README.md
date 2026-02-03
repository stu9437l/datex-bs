# datex-bs

A lightweight TypeScript library for converting dates between AD (Gregorian) and BS (Bikram Sambat/Nepali) calendars.

[![npm version](https://img.shields.io/npm/v/datex-bs.svg)](https://www.npmjs.com/package/datex-bs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- ✅ Convert AD dates to BS dates
- ✅ Convert BS dates to AD dates
- ✅ Validate BS dates
- ✅ TypeScript support with full type definitions
- ✅ Lightweight with no dependencies
- ✅ Supports BS years from 1970 to 2300
- ✅ Optimized conversion algorithms

## Installation

```bash
npm install datex-bs
```

or

```bash
yarn add datex-bs
```

or

```bash
pnpm add datex-bs
```

## Quick Start

```typescript
import { adToBs, bsToAd } from "datex-bs";

// Convert AD to BS
const bsDate = adToBs(new Date("2024-02-03"));
console.log(bsDate); // { year: 2080, month: 10, day: 21 }

// Convert BS to AD
const adDate = bsToAd({ year: 2080, month: 10, day: 21 });
console.log(adDate); // 2024-02-03T00:00:00.000Z
```

## API Reference

### `adToBs(adDate: Date): BSDate`

Converts an AD (Gregorian) date to BS (Bikram Sambat) date.

**Parameters:**

- `adDate` (Date): The AD date to convert

**Returns:**

- `BSDate`: Object containing `{ year, month, day }`

**Example:**

```typescript
import { adToBs } from "datex-bs";

const bsDate = adToBs(new Date("2023-04-14"));
console.log(bsDate);
// Output: { year: 2080, month: 1, day: 1 }

// Using current date
const today = adToBs(new Date());
console.log(today);
// Output: { year: 2081, month: 10, day: 21 } (example)
```

**Error Handling:**

```typescript
try {
  const bsDate = adToBs(new Date("1800-01-01"));
} catch (error) {
  console.error(error.message);
  // Output: "Date is out of range. Minimum supported BS year is 1970"
}
```

---

### `bsToAd(bs: BSDate): Date`

Converts a BS (Bikram Sambat) date to AD (Gregorian) date.

**Parameters:**

- `bs` (BSDate): Object with `{ year, month, day }`

**Returns:**

- `Date`: JavaScript Date object

**Example:**

```typescript
import { bsToAd } from "datex-bs";

const adDate = bsToAd({ year: 2080, month: 1, day: 1 });
console.log(adDate);
// Output: 2023-04-14T00:00:00.000Z

// Format the date as needed
const formatted = adDate.toLocaleDateString("en-US");
console.log(formatted);
// Output: "4/14/2023"
```

**Error Handling:**

```typescript
try {
  const adDate = bsToAd({ year: 1800, month: 1, day: 1 });
} catch (error) {
  console.error(error.message);
  // Output: "Invalid BS date: 1800-1-1. Supported year range: 1970-2300"
}
```

---

### `validateBSDate(bs: BSDate): { valid: boolean; error?: string }`

Validates a BS date and provides detailed error information.

**Parameters:**

- `bs` (BSDate): Object with `{ year, month, day }`

**Returns:**

- Object with `valid` boolean and optional `error` message

**Example:**

```typescript
import { validateBSDate } from "datex-bs";

// Valid date
const result1 = validateBSDate({ year: 2080, month: 1, day: 1 });
console.log(result1);
// Output: { valid: true }

// Invalid year
const result2 = validateBSDate({ year: 1800, month: 1, day: 1 });
console.log(result2);
// Output: {
//   valid: false,
//   error: "Year 1800 is out of range. Supported: 1970-2300"
// }

// Invalid month
const result3 = validateBSDate({ year: 2080, month: 13, day: 1 });
console.log(result3);
// Output: {
//   valid: false,
//   error: "Month 13 is invalid. Must be between 1-12"
// }

// Invalid day for the month
const result4 = validateBSDate({ year: 2080, month: 1, day: 35 });
console.log(result4);
// Output: {
//   valid: false,
//   error: "Day 35 is invalid for 2080/1. Must be between 1-31"
// }
```

---

### `getBSSupportedRange(): { minYear: number; maxYear: number }`

Returns the supported BS year range.

**Returns:**

- Object with `minYear` and `maxYear`

**Example:**

```typescript
import { getBSSupportedRange } from "datex-bs";

const range = getBSSupportedRange();
console.log(range);
// Output: { minYear: 1970, maxYear: 2300 }

console.log(
  `This library supports BS years from ${range.minYear} to ${range.maxYear}`,
);
// Output: "This library supports BS years from 1970 to 2300"
```

---

### `getSupportedDateRange(): { minYear, maxYear, minAD, maxAD }`

Returns detailed information about supported date ranges in both BS and AD.

**Returns:**

- Object containing:
  - `minYear`: Minimum BS year
  - `maxYear`: Maximum BS year
  - `minAD`: Approximate minimum AD date
  - `maxAD`: Approximate maximum AD date

**Example:**

```typescript
import { getSupportedDateRange } from "datex-bs";

const range = getSupportedDateRange();
console.log(range);
// Output: {
//   minYear: 1970,
//   maxYear: 2300,
//   minAD: Date('1913-04-13'),
//   maxAD: Date('2243-04-13')
// }
```

---

### `isDateInSupportedRange(adDate: Date): boolean`

Checks if an AD date can be converted to BS.

**Parameters:**

- `adDate` (Date): The AD date to check

**Returns:**

- `boolean`: `true` if the date is supported, `false` otherwise

**Example:**

```typescript
import { isDateInSupportedRange } from "datex-bs";

const isSupported1 = isDateInSupportedRange(new Date("2024-02-03"));
console.log(isSupported1); // true

const isSupported2 = isDateInSupportedRange(new Date("1800-01-01"));
console.log(isSupported2); // false
```

---

## Types

### BSDate

```typescript
interface BSDate {
  year: number; // BS year (1970-2300)
  month: number; // Month (1-12)
  day: number; // Day (1-32, depending on month)
}
```

## Usage Examples

### Example 1: Basic Conversion

```typescript
import { adToBs, bsToAd } from "datex-bs";

// AD to BS
const bsDate = adToBs(new Date("2024-12-25"));
console.log(`BS Date: ${bsDate.year}/${bsDate.month}/${bsDate.day}`);

// BS to AD
const adDate = bsToAd({ year: 2081, month: 9, day: 10 });
console.log(`AD Date: ${adDate.toDateString()}`);
```

### Example 2: With Validation

```typescript
import { bsToAd, validateBSDate } from "datex-bs";

const bsInput = { year: 2080, month: 12, day: 30 };

// Validate before conversion
const validation = validateBSDate(bsInput);

if (validation.valid) {
  const adDate = bsToAd(bsInput);
  console.log("Converted successfully:", adDate);
} else {
  console.error("Validation failed:", validation.error);
}
```

### Example 3: Error Handling

```typescript
import { adToBs } from "datex-bs";

try {
  const bsDate = adToBs(new Date("1500-01-01"));
  console.log(bsDate);
} catch (error) {
  if (error instanceof Error) {
    console.error("Conversion failed:", error.message);
  }
}
```

### Example 4: Current Date Conversion

```typescript
import { adToBs } from "datex-bs";

const currentBSDate = adToBs(new Date());
console.log(
  `Today in BS: ${currentBSDate.year}/${currentBSDate.month}/${currentBSDate.day}`,
);
```

### Example 5: Date Range Validation

```typescript
import { isDateInSupportedRange, adToBs } from "datex-bs";

const userDate = new Date("2025-06-15");

if (isDateInSupportedRange(userDate)) {
  const bsDate = adToBs(userDate);
  console.log("Converted:", bsDate);
} else {
  console.log("Date is outside supported range");
}
```

### Example 6: Building a Date Picker

```typescript
import { bsToAd, validateBSDate, getBSSupportedRange } from "datex-bs";

function createBSDatePicker() {
  const range = getBSSupportedRange();

  // Generate year options
  const years = Array.from(
    { length: range.maxYear - range.minYear + 1 },
    (_, i) => range.minYear + i,
  );

  return {
    years,
    months: Array.from({ length: 12 }, (_, i) => i + 1),
    validateAndConvert: (year: number, month: number, day: number) => {
      const validation = validateBSDate({ year, month, day });

      if (!validation.valid) {
        return { error: validation.error };
      }

      const adDate = bsToAd({ year, month, day });
      return { date: adDate };
    },
  };
}
```

### Example 7: React Component

```typescript
import { useState } from 'react';
import { adToBs, bsToAd, type BSDate } from 'datex-bs';

function DateConverter() {
  const [adDate, setAdDate] = useState(new Date());
  const [bsDate, setBsDate] = useState<BSDate>(adToBs(new Date()));

  const handleADChange = (date: Date) => {
    setAdDate(date);
    setBsDate(adToBs(date));
  };

  const handleBSChange = (bs: BSDate) => {
    setBsDate(bs);
    setAdDate(bsToAd(bs));
  };

  return (
    <div>
      <div>
        <label>AD Date:</label>
        <input
          type="date"
          value={adDate.toISOString().split('T')[0]}
          onChange={(e) => handleADChange(new Date(e.target.value))}
        />
      </div>

      <div>
        <label>BS Date:</label>
        <span>
          {bsDate.year}/{bsDate.month}/{bsDate.day}
        </span>
      </div>
    </div>
  );
}
```

## Supported Date Range

- **BS Years:** 1970 - 2300
- **AD Years:** Approximately 1913 - 2243

## Browser Support

This library works in all modern browsers and Node.js environments that support ES6+.

## Performance

The library uses optimized algorithms that:

- Skip entire years when possible (year-level iteration)
- Skip entire months when possible (month-level iteration)
- Only iterate day-by-day when necessary

For a date 5 years away, this reduces iterations from ~1,800 to ~65.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © [Your Name]

## Credits

This library uses the official Bikram Sambat calendar data for accurate date conversions.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/yourusername/datex-bs/issues) on GitHub.
