const input = await Deno.readTextFile("./03/input.txt");
console.log({ input });

const instruction = /(do\(\))|(don\'t\(\))|(mul\(\d+,\d+\))/g;
const instructions = input.match(instruction);
console.log({ instructions });

const filtered = [];
let disabled = false;

for (const inst of instructions!) {
  if (inst === "don't()") {
    disabled = true;
    continue;
  }
  if (inst === "do()") {
    disabled = false;
    continue;
  }
  if (!disabled) {
    filtered.push(inst);
  }
}

const products = filtered!.map((raw) => {
  const [a, b] = raw.replace("mul(", "").replace(")", "").split(",").map(
    Number,
  );
  return a * b;
});

console.log({ result: products.reduce((a, b) => a + b) });
