import input from "./input.ts";

const height = 103;
const width = 101;

const bots = input.split("\n").map((bs) =>
  bs.matchAll(/\-?\d+/g).toArray()
    .map((ar) => ar.at(0))
    .map(Number)
).map(([px, py, vx, vy]) => ({ px, py, vx, vy }));

console.log(bots);

function vis(t: number) {
  const finalPositions = bots.map(({ px, py, vx, vy }) => ({
    // Forgot to increase this offset and lost a lot of time.
    x: (vx * t + px + 100000000 * width) % width,
    y: (vy * t + py + 100000000 * height) % height,
  }));

  const visual = finalPositions.reduce((m, p) => {
    const key = `${p.x}|${p.y}`;
    m.set(key, (m.get(key) || 0) + 1);
    return m;
  }, new Map<string, number>());

  const lines = [];
  for (let y = 0; y < height; y++) {
    const line = new Array(width).fill(".").map((_, x) =>
      visual.get(`${x}|${y}`) ? "X" : "."
    ).join("");
    lines.push(line);
  }
  // Arbitrary guess that the tree will be solid, increased until on a handful printed out.
  if (lines.find((line) => line.includes("XXXXXXXXXX"))) {
    for (const line of lines) {
      console.log(line);
    }
    console.log(i);
  }
  return;
}
let i = 1;
// Need to watch and kill when enough is printed out.
while (true) {
  vis(i);
  if (i % 1000 === 0) {
    console.log(i);
  }
  i++;
  // Turns out that you shouldn't need more than 10,000
  if (i > 10000) break;
}
