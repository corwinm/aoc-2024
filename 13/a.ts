// import input from "./smallInput.ts";
import input from "./input.ts";

// Button A: X+94, Y+34
// Button B: X+22, Y+67
// Prize: X=8400, Y=5400
type Block = {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  xTarget: number;
  yTarget: number;
};

const blocks = input.split("\n\n").map((block): Block => {
  const parsed = block.replaceAll("\n", "").matchAll(
    /Button A. X\+(?<ax>\d+). Y\+(?<ay>\d+)Button B. X\+(?<bx>\d+). Y\+(?<by>\d+)Prize. X=(?<x>\d+), Y=(?<y>\d+)/g,
  ).toArray()[0].groups;
  return {
    ax: Number(parsed?.ax),
    ay: Number(parsed?.ay),
    bx: Number(parsed?.bx),
    by: Number(parsed?.by),
    xTarget: Number(parsed?.x),
    yTarget: Number(parsed?.y),
  };
});

console.log(blocks);
const aCost = 3;
const bCost = 1;

let result = 0;

for (const { ax, ay, bx, by, xTarget, yTarget } of blocks) {
  let minCost = 0;
  for (let a = 100; a--;) {
    for (let b = 100; b--;) {
      const x = a * ax + b * bx;
      const y = a * ay + b * by;
      if (x === xTarget && y === yTarget) {
        console.log(x, y, a, b);
        const cost = a * aCost + b * bCost;
        if (minCost === 0) {
          minCost = cost;
        } else if (cost < minCost) {
          minCost = cost;
        }
      }
    }
  }
  result += minCost;
}
console.log(result);
