// import input from "./smallInput.ts";
import input from "./input.ts";
// const input = `p=0,0 v=-1,-1
// p=0,0 v=1,1`;
// const input = `p=2,4 v=2,-3
// p=2,2 v=-2,-2
// p=10,6 v=-2,-2`;

// For smallInput
// const height = 7;
// const width = 11;
const height = 103;
const width = 101;

// p=0,4 v=3,-3
const bots = input.split("\n").map((bs) =>
  bs.matchAll(/\-?\d+/g).toArray()
    .map((ar) => ar.at(0))
    .map(Number)
).map(([px, py, vx, vy]) => ({ px, py, vx, vy }));

console.log(bots);

// x = (vx*t + px) % width
// y = (vy*t + py) % height
const t = 100;
const finalPositions = bots.map(({ px, py, vx, vy }) => ({
  // Arbitrary offset of 100 so that negative velocity resolves to a positive number
  x: (vx * t + px + 100 * width) % width,
  y: (vy * t + py + 100 * height) % height,
}));
console.log(finalPositions);
const visual = finalPositions.reduce((m, p) => {
  const key = `${p.x}|${p.y}`;
  m.set(key, (m.get(key) || 0) + 1);
  return m;
}, new Map<string, number>());

for (let y = 0; y < height; y++) {
  const line = new Array(width).fill(".").map((_, x) =>
    visual.get(`${x}|${y}`) || "."
  ).join(" ");
  console.log(line);
}

const midX = width / 2;
const midY = height / 2;
const quadrantsPopulation = finalPositions.reduce((p, pos) => {
  if (pos.x < Math.floor(midX) && pos.y < Math.floor(midY)) {
    p.nw++;
  } else if (pos.x > Math.floor(midX) && pos.y > Math.floor(midY)) {
    p.se++;
  } else if (pos.x > Math.floor(midX) && pos.y < Math.floor(midY)) {
    p.sw++;
  } else if (pos.x < Math.floor(midX) && pos.y > Math.floor(midY)) {
    p.ne++;
  }
  return p;
}, {
  nw: 0,
  ne: 0,
  sw: 0,
  se: 0,
});

console.log(quadrantsPopulation);
console.log(Object.values(quadrantsPopulation));
console.log(
  "Saftey Factor:",
  Object.values(quadrantsPopulation).reduce((a, b) => a * b, 1),
);
