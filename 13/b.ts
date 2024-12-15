// import input from "./smallInput.ts";
import input from "./input.ts";

// Button A: X+94, Y+34
// Button B: X+22, Y+67
// Prize: X=8400, Y=5400
//
// px = ax*i + bx*j | *by
// py = ay*i + by*j | *bx
//
// px*by = ax*by*i + bx*by*j
// py*bx = ay*bx*i + by*bx*j
//
// Subtract
// px*by - py*bx = ax*by*i - ay*bx*i
//
// i = (px*by -py*bx)/(ax*by - ay*bx)
//
// j =
// px = ax*i + bx*j | *by
// j = (px - ax*i) / bx
type Block = {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  px: number;
  py: number;
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
    px: Number(parsed?.x) + 10000000000000,
    py: Number(parsed?.y) + 10000000000000,
  };
});

let result = 0;

for (const { ax, ay, bx, by, px, py } of blocks) {
  const i = (px * by - py * bx) / (ax * by - ay * bx);
  const j = (px - ax * i) / bx;
  if (i % 1 === 0 && j % 1 === 0) {
    result += 3 * i + j;
    console.log(i, j, result);
  }
}
console.log(result);
