// import input from "./smallInput.ts";
import input from "./input.ts";

interface MapPoint {
  x: number;
  y: number;
  score: number;
  val: number;
}

const map = input.split("\n").map((row, y) =>
  row.split("").map((col, x) => ({ x, y, val: Number(col), score: 0 }))
);
console.log(map);

const trailheads = map.flat().filter((point) => point.val === 0);
console.log({ trailheads, count: trailheads.length });

function countTrails(x: number, y: number, prev: number): null | MapPoint[] {
  if (y < 0 || y > map.length - 1 || x < 0 || x > map[0].length - 1) {
    return null;
  }
  const { val } = map[y][x];
  if ((prev + 1) !== val) return null;
  if (val === 9) return [map[y][x]];

  const upTrails = countTrails(x, y - 1, val) || [];
  const downTrails = countTrails(x, y + 1, val) || [];
  const rightTrails = countTrails(x + 1, y, val) || [];
  const leftTrails = countTrails(x - 1, y, val) || [];
  return [upTrails, downTrails, rightTrails, leftTrails].flat();
}

for (const trailhead of trailheads) {
  const score = countTrails(trailhead.x, trailhead.y, -1);
  trailhead.score = score
    ? new Set(score.map(({ x, y }) => `${x}|${y}`)).size
    : 0;
}
console.log({ trailheads });
console.log({ score: trailheads.reduce((sum, cur) => sum + cur.score, 0) });
