import input from "./input.ts";

const parsed = input.split("\n").map((row) =>
  row.split(": ").map((col, i) => i ? col.split(" ").map(Number) : Number(col))
);

console.log(parsed);

function canCalculate(result: number, nums: number[]) {
  let possible = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    const newPossible = possible.map((
      n,
    ) => [n + num, n * num, Number(`${n}${num}`)]).flat();
    possible = newPossible;
  }
  return possible.includes(result);
}

const results = [];

for (const [result, numbers] of parsed) {
  if (
    typeof result === "number" && Array.isArray(numbers) &&
    canCalculate(result, numbers)
  ) {
    results.push(result);
  }
}
console.log({ sum: results.reduce((a, b) => a + b) });
