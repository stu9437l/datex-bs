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
- ✅ Flexible input formats (string, Date object, BSDate object)
- ✅ String or object output options

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
import { ADToBS, BSToAD } from "datex-bs";

// Convert AD to BS (returns formatted string)
ADToBS("2024-02-03");
// → "2080-10-21"

ADToBS(new Date(2024, 1, 3));
// → "2080-10-21"

// Convert BS to AD (returns formatted string)
BSToAD("2080-10-21");
// → "2024-02-03"

BSToAD({ year: 2080, month: 10, day: 21 });
// → "2024-02-03"
```

## API Reference

### `ADToBS(adDate: Date | string): string`

Converts an AD (Gregorian) date to BS (Bikram Sambat) date string.

**Parameters:**

- `adDate` (Date | string): The AD date to convert
  - String format: `"YYYY-MM-DD"`
  - Date object: JavaScript Date

**Returns:**

- `string`: BS date in format `"YYYY-MM-DD"`

**Examples:**

```typescript
import { ADToBS } from "datex-bs";

// Using string input
ADToBS("2019-08-25");
// → "2076-05-08"

ADToBS("2023-04-14");
// → "2080-01-01"

// Using Date object
ADToBS(new Date(2019, 7, 25)); // Note: month is 0-indexed
// → "2076-05-08"

ADToBS(new Date("2024-12-25"));
// → "2081-09-10"

// Using current date
ADToBS(new Date());
// → "2081-10-21" (example)
```

**Error Handling:**

```typescript
try {
  const bsDate = ADToBS("1800-01-01");
} catch (error) {
  console.error(error.message);
  // → "Date is out of range. Minimum supported BS year is 1970"
}
```

---

### `BSToAD(bsDate: string | BSDate): string`

Converts a BS (Bikram Sambat) date to AD (Gregorian) date string.

**Parameters:**

- `bsDate` (string | BSDate): The BS date to convert
  - String format: `"YYYY-MM-DD"`
  - Object format: `{ year, month, day }`

**Returns:**

- `string`: AD date in format `"YYYY-MM-DD"`

**Examples:**

```typescript
import { BSToAD } from "datex-bs";

// Using string input
BSToAD("2076-05-08");
// → "2019-08-25"

BSToAD("2080-01-01");
// → "2023-04-14"

// Using object input
BSToAD({ year: 2076, month: 5, day: 8 });
// → "2019-08-25"

BSToAD({ year: 2081, month: 9, day: 10 });
// → "2024-12-25"
```

**Error Handling:**

```typescript
try {
  const adDate = BSToAD("1800-01-01");
} catch (error) {
  console.error(error.message);
  // → "Invalid BS date: 1800-1-1. Supported year range: 1970-2300"
}
```

---

### `convertADToBS(adDate: Date | string): BSDate`

Converts an AD date to BS date object (for detailed manipulation).

**Parameters:**

- `adDate` (Date | string): The AD date to convert

**Returns:**

- `BSDate`: Object containing `{ year, month, day }`

**Examples:**

```typescript
import { convertADToBS } from "datex-bs";

const bsDate = convertADToBS("2023-04-14");
console.log(bsDate);
// → { year: 2080, month: 1, day: 1 }

const today = convertADToBS(new Date());
console.log(`${today.year}/${today.month}/${today.day}`);
// → "2081/10/21"
```

---

### `convertBSToAD(bsDate: string | BSDate): Date`

Converts a BS date to AD Date object (for detailed manipulation).

**Parameters:**

- `bsDate` (string | BSDate): The BS date to convert

**Returns:**

- `Date`: JavaScript Date object

**Examples:**

```typescript
import { convertBSToAD } from "datex-bs";

const adDate = convertBSToAD("2080-01-01");
console.log(adDate);
// → 2023-04-14T00:00:00.000Z

const adDate2 = convertBSToAD({ year: 2080, month: 1, day: 1 });
console.log(adDate2.toLocaleDateString("en-US"));
// → "4/14/2023"
```

---

### `validateBSDate(bs: BSDate): { valid: boolean; error?: string }`

Validates a BS date and provides detailed error information.

**Parameters:**

- `bs` (BSDate): Object with `{ year, month, day }`

**Returns:**

- Object with `valid` boolean and optional `error` message

**Examples:**

```typescript
import { validateBSDate } from "datex-bs";

// Valid date
validateBSDate({ year: 2080, month: 1, day: 1 });
// → { valid: true }

// Invalid year
validateBSDate({ year: 1800, month: 1, day: 1 });
// → { valid: false, error: "Year 1800 is out of range. Supported: 1970-2300" }

// Invalid month
validateBSDate({ year: 2080, month: 13, day: 1 });
// → { valid: false, error: "Month 13 is invalid. Must be between 1-12" }

// Invalid day
validateBSDate({ year: 2080, month: 1, day: 35 });
// → { valid: false, error: "Day 35 is invalid for 2080/1. Must be between 1-31" }
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
// → { minYear: 1970, maxYear: 2300 }
```

---

### `formatBSDate(bs: BSDate): string`

Formats a BSDate object to string format.

**Parameters:**

- `bs` (BSDate): BS date object

**Returns:**

- `string`: Formatted date string `"YYYY-MM-DD"`

**Example:**

```typescript
import { formatBSDate } from "datex-bs";

formatBSDate({ year: 2080, month: 1, day: 1 });
// → "2080-01-01"
```

---

### `formatADDate(date: Date): string`

Formats a Date object to string format.

**Parameters:**

- `date` (Date): JavaScript Date object

**Returns:**

- `string`: Formatted date string `"YYYY-MM-DD"`

**Example:**

```typescript
import { formatADDate } from "datex-bs";

formatADDate(new Date("2023-04-14"));
// → "2023-04-14"
```

---

### Class API: `BikramSambat`

Object-oriented interface for date conversion.

**Constructor:**

```typescript
new BikramSambat(date: Date | string, format?: "AD" | "BS")
```

**Methods:**

- `toBS(): string` - Convert to BS string
- `toAD(): string` - Convert to AD string
- `getBSDate(): BSDate` - Get BS date object
- `getDate(): Date` - Get AD Date object

**Examples:**

```typescript
import BikramSambat from "datex-bs";

// Create from AD date
const bs1 = new BikramSambat("2019-08-25");
bs1.toBS();
// → "2076-05-08"

const bs2 = new BikramSambat(new Date(2019, 7, 25));
bs2.toBS();
// → "2076-05-08"

// Create from BS date
const bs3 = new BikramSambat("2076-05-08", "BS");
bs3.toAD();
// → "2019-08-25"

// Get detailed objects
const bsDate = bs1.getBSDate();
// → { year: 2076, month: 5, day: 8 }

const adDate = bs3.getDate();
// → Date object
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
import { ADToBS, BSToAD } from "datex-bs";

// String to string conversion
const bs = ADToBS("2024-12-25");
console.log(`BS Date: ${bs}`);
// → "BS Date: 2081-09-10"

const ad = BSToAD("2081-09-10");
console.log(`AD Date: ${ad}`);
// → "AD Date: 2024-12-25"

// Object input
const ad2 = BSToAD({ year: 2081, month: 9, day: 10 });
console.log(ad2);
// → "2024-12-25"
```

### Example 2: With Validation

```typescript
import { BSToAD, validateBSDate } from "datex-bs";

const bsInput = { year: 2080, month: 12, day: 30 };

// Validate before conversion
const validation = validateBSDate(bsInput);

if (validation.valid) {
  const adDate = BSToAD(bsInput);
  console.log("Converted:", adDate);
} else {
  console.error("Validation failed:", validation.error);
}
```

### Example 3: Working with Objects

```typescript
import { convertADToBS, convertBSToAD } from "datex-bs";

// Get BS date object for manipulation
const bsDate = convertADToBS("2024-02-03");
console.log(`Year: ${bsDate.year}, Month: ${bsDate.month}, Day: ${bsDate.day}`);
// → "Year: 2080, Month: 10, Day: 21"

// Convert back using object
const adDate = convertBSToAD(bsDate);
console.log(adDate.toISOString());
// → "2024-02-03T00:00:00.000Z"
```

### Example 4: Current Date

```typescript
import { ADToBS, convertADToBS } from "datex-bs";

// Get today's date in BS (string format)
const todayBS = ADToBS(new Date());
console.log(`Today in BS: ${todayBS}`);

// Get today's date in BS (object format)
const todayBSObj = convertADToBS(new Date());
console.log(`${todayBSObj.year}/${todayBSObj.month}/${todayBSObj.day}`);
```

### Example 5: Form Integration

```typescript
import { BSToAD, validateBSDate } from "datex-bs";

function handleBSDateSubmit(year: number, month: number, day: number) {
  const validation = validateBSDate({ year, month, day });

  if (!validation.valid) {
    alert(validation.error);
    return;
  }

  const adDate = BSToAD({ year, month, day });
  console.log(`Selected AD date: ${adDate}`);
}
```

### Example 6: React Component

```typescript
import { useState } from 'react';
import { ADToBS, BSToAD, convertADToBS, type BSDate } from 'datex-bs';

function DateConverter() {
  const [adDateStr, setAdDateStr] = useState("2024-02-03");
  const [bsDateStr, setBsDateStr] = useState(ADToBS("2024-02-03"));

  const handleADChange = (dateStr: string) => {
    setAdDateStr(dateStr);
    try {
      setBsDateStr(ADToBS(dateStr));
    } catch (error) {
      console.error(error);
    }
  };

  const handleBSChange = (dateStr: string) => {
    setBsDateStr(dateStr);
    try {
      setAdDateStr(BSToAD(dateStr));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <label>AD Date:</label>
        <input
          type="date"
          value={adDateStr}
          onChange={(e) => handleADChange(e.target.value)}
        />
      </div>

      <div>
        <label>BS Date:</label>
        <input
          type="text"
          value={bsDateStr}
          onChange={(e) => handleBSChange(e.target.value)}
          placeholder="YYYY-MM-DD"
        />
      </div>
    </div>
  );
}
```

### Example 7: Class-based Approach

```typescript
import BikramSambat from "datex-bs";

// Convert AD to BS
const converter1 = new BikramSambat("2019-08-25");
console.log(converter1.toBS());
// → "2076-05-08"

// Convert BS to AD
const converter2 = new BikramSambat("2076-05-08", "BS");
console.log(converter2.toAD());
// → "2019-08-25"

// Get detailed objects
const bsObj = converter1.getBSDate();
console.log(bsObj);
// → { year: 2076, month: 5, day: 8 }
```

## Input/Output Formats

### ADToBS

| Input Type | Example                 | Output         |
| ---------- | ----------------------- | -------------- |
| String     | `"2019-08-25"`          | `"2076-05-08"` |
| Date       | `new Date(2019, 7, 25)` | `"2076-05-08"` |

### BSToAD

| Input Type | Example                            | Output         |
| ---------- | ---------------------------------- | -------------- |
| String     | `"2076-05-08"`                     | `"2019-08-25"` |
| Object     | `{ year: 2076, month: 5, day: 8 }` | `"2019-08-25"` |

### convertADToBS

| Input Type | Example                 | Output                             |
| ---------- | ----------------------- | ---------------------------------- |
| String     | `"2019-08-25"`          | `{ year: 2076, month: 5, day: 8 }` |
| Date       | `new Date(2019, 7, 25)` | `{ year: 2076, month: 5, day: 8 }` |

### convertBSToAD

| Input Type | Example                            | Output        |
| ---------- | ---------------------------------- | ------------- |
| String     | `"2076-05-08"`                     | `Date object` |
| Object     | `{ year: 2076, month: 5, day: 8 }` | `Date object` |

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
