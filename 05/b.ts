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

const invalidResults = [];

for (const update of updatesParses) {
  const entries = update.split(",");
  let failed = false;
  for (let i = 0; i < entries.length - 1; i++) {
    failed = violatesRule(entries[i], entries[i + 1]);
    if (failed) break;
  }
  if (failed) {
    console.log(
      `Failed! Entries: ${entries}`,
    );
    invalidResults.push(entries);
  }
}
console.log({
  invalidCount: invalidResults.length,
  invalidResults,
});

for (let ent = 0; ent < invalidResults.length; ent++) {
  for (let i = 0; i < invalidResults[ent].length - 1; i++) {
    const failed = violatesRule(
      invalidResults[ent][i],
      invalidResults[ent][i + 1],
    );
    if (failed) {
      const a = invalidResults[ent][i];
      const b = invalidResults[ent][i + 1];
      console.log(`Swap ${a} ${b}`);
      invalidResults[ent][i] = b;
      invalidResults[ent][i + 1] = a;
      console.log(invalidResults[ent]);
      // Repeat row when a switch is made
      ent--;
      break;
    }
  }
}
const answer = invalidResults.map((row) => row[Math.floor(row.length / 2)])
  .reduce((a, b) => Number(a) + Number(b), 0);
console.log({ answer });
