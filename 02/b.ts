import input from "./input.ts";
import { parse } from "@std/csv/parse";

function isSafe(a: number, b: number, prevResult?: number) {
  const change = b - a;
  console.log({ change });
  if (Math.abs(change) > 3 || change === 0) {
    return {
      safe: false,
      change,
    };
  }
  if (
    prevResult === undefined || (change > 0 && prevResult > 0) ||
    (change < 0 && prevResult < 0)
  ) {
    return {
      safe: true,
      change,
    };
  }
  return { safe: false, change };
}

const parsedInput = parse(input, { separator: " " });

function isRowSafe(row: string[]) {
  let previousChange: number | undefined = undefined;
  let lastNum: number | undefined = undefined;
  console.log("Row: ", row);
  for (const val of row) {
    const num = Number(val);
    console.log(val);
    if (lastNum === undefined) {
      lastNum = num;
      continue;
    }
    const result = isSafe(lastNum, num, previousChange);
    console.log(result);
    if (!result.safe) {
      console.log("Not safe");
      return false;
    }
    previousChange = result.change;
    lastNum = num;
  }
  console.log("Safe");
  return true;
}

const results = parsedInput.map((row) => {
  for (let i = 0; i < row.length; i++) {
    const subRow = row.toSpliced(i, 1);
    const result = isRowSafe(subRow);
    if (result) {
      return true;
    }
  }
  return false;
});

const safeCount = results.filter(Boolean).length;
console.log("Safe Count: ", safeCount);
