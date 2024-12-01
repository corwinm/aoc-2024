import { parse } from "@std/csv";
import input from "./input.ts";

console.log("Day 1: B");

const parsedInput = parse(input, { separator: "   " });

const left = parsedInput.map(([left]) => Number(left)).toSorted((a, b) =>
  a - b
);

const right = parsedInput.map(([, right]) => Number(right)).toSorted((
  a,
  b,
) => a - b);
const rightMap = right.reduce((mapped, curr) => {
  const val = mapped.get(curr);
  if (val) {
    mapped.set(curr, val + 1);
  } else {
    mapped.set(curr, 1);
  }

  return mapped;
}, new Map<number, number>());
const scores = [];

for (let i = 0; i < parsedInput.length; i++) {
  const num = left[i];
  const count = rightMap.get(num) || 0;
  const score = num * count;
  console.log({ num, count, score });
  scores.push(score);
}

console.log("Sum scores: ", scores.reduce((sum, curr) => sum + curr, 0));
