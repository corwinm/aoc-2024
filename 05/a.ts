import { rules, updates } from "./input.ts";

const ruleTbl = rules.split("\n");

console.log({ ruleTbl: ruleTbl.slice(0, 10) });

function violatesRule(first: string, second: string) {
  const invalidRule = `${second}|${first}`;
  const match = ruleTbl.includes(invalidRule);
  return match;
}

console.log(violatesRule("66", "43"));
console.log(violatesRule("43", "66"));

const updatesParses = updates.split("\n");

const validResults = [];

for (const update of updatesParses) {
  const entries = update.split(",");
  let failed = false;
  for (let i = 0; i < entries.length - 1; i++) {
    failed = violatesRule(entries[i], entries[i + 1]);
    if (failed) break;
  }
  if (!failed) {
    const middle = entries[
      Math.ceil(
        entries.length / 2,
      ) - 1
    ];
    console.log(
      `Passed! Entries: ${entries} Middle: ${middle}`,
    );
    validResults.push(middle);
  }
}
console.log({
  answer: validResults.reduce((a, b) => Number(a) + Number(b), 0),
});
