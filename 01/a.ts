import { parse } from "@std/csv";
import input from "./input.ts";

console.log("Day 1: A");

const parsedInput = parse(input, { separator: "   " });
console.log(parsedInput);

const left = parsedInput.map(([left]) => Number(left)).toSorted((a, b) =>
  a - b
);

const right = parsedInput.map(([, right]) => Number(right)).toSorted((
  a,
  b,
) => a - b);
const distances = [];

for (let i = 0; i < parsedInput.length; i++) {
  distances.push(Math.abs(left[i] - right[i]));
}

console.log("Sum distances: ", distances.reduce((sum, curr) => sum + curr, 0));
