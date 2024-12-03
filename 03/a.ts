const input = await Deno.readTextFile("./03/input.txt");
console.log({ input });

const instruction = /mul\(\d+,\d+\)/g;

const instructions = input.match(instruction);

console.log({ instructions });

const products = instructions!.map((raw) => {
  const [a, b] = raw.replace("mul(", "").replace(")", "").split(",").map(
    Number,
  );
  return a * b;
});

console.log({ result: products.reduce((a, b) => a + b) });
