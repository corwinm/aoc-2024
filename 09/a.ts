// import input from "./smallInput.ts";
import input from "./input.ts";

const expanded = input.split("").map((num, idx) =>
  idx % 2 === 0
    ? new Array<string>(Number(num)).fill(String(idx / 2))
    : new Array<string>(Number(num)).fill(".")
).flat();

const expectedSmall = "00...111...2...333.44.5555.6666.777.888899";

console.log(expanded.join(""));
console.log(expectedSmall === expanded.join(""));

let r = 0;
let i = expanded.length - 1;
const expChars = expanded;

while (i > r) {
  if (expChars[r] !== ".") {
    r++;
    continue;
  }
  if (expChars[i] === ".") {
    i--;
    continue;
  }
  expChars[r] = expChars[i];
  expChars[i] = ".";
  r++;
  i--;
}
console.log("Compacted:");
console.log(expChars.join(""));

const smallExpected = "0099811188827773336446555566..............";
console.log(smallExpected === expChars.join(""));

const checksum = expChars.reduce(
  (sum, cur, idx) => cur === "." ? sum : sum + (Number(cur) * idx),
  0,
);
console.log({ checksum });
