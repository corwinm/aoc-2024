// import input from "./smallInput.ts";
import input from "./input.ts";
// import input from "./largerExample.ts";

interface Plot {
  x: number;
  y: number;
  val: string;
  sides: number;
  region: number;
}

const rawMap = input.split("\n").map((a) => a.split(""));
const map = rawMap.map((row, y) =>
  row.map((col, x): Plot => ({
    x,
    y,
    val: col,
    sides: 0,
    region: -1,
  }))
);

// console.log(map);

const regions: Plot[][] = [];

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    const plot = map[y][x];
    if (plot.region < 0) {
      plot.region = regions.length;
      regions.push([]);
    }
    regions[plot.region].push(plot);
    let sides = 4;
    // up
    if (y !== 0) {
      // If up is part of same region
      const up = map[y - 1][x];
      if (up.val === plot.val) {
        if (up.region > -1 && plot.region > -1 && up.region !== plot.region) {
          // need to join regions
          regions[up.region] = regions[up.region].concat(regions[plot.region]);
          regions[plot.region] = [];
          regions[up.region].forEach((p) => {
            p.region = up.region;
          });
        } else {
          up.region = plot.region;
        }
        sides--;
      }
    }
    // down
    if (y !== map.length - 1) {
      const down = map[y + 1][x];
      if (down.val === plot.val) {
        if (
          down.region > -1 && plot.region > -1 && down.region !== plot.region
        ) {
          // need to join regions
          regions[down.region] = regions[down.region].concat(
            regions[plot.region],
          );
          regions[plot.region] = [];
          regions[down.region].forEach((p) => {
            p.region = down.region;
          });
        } else {
          down.region = plot.region;
        }
        sides--;
      }
    }
    // left
    if (x !== 0) {
      const left = map[y][x - 1];
      if (left.val === plot.val) {
        if (
          left.region > -1 && plot.region > -1 && left.region !== plot.region
        ) {
          // need to join regions
          regions[left.region] = regions[left.region].concat(
            regions[plot.region],
          );
          regions[plot.region] = [];
          regions[left.region].forEach((p) => {
            p.region = left.region;
          });
        } else {
          left.region = plot.region;
        }
        sides--;
      }
    }
    // right
    if (x !== map[y].length - 1) {
      const right = map[y][x + 1];
      if (right.val === plot.val) {
        if (
          right.region > -1 && plot.region > -1 && right.region !== plot.region
        ) {
          // need to join regions
          regions[right.region] = regions[right.region].concat(
            regions[plot.region],
          );
          regions[plot.region] = [];
          regions[right.region].forEach((p) => {
            p.region = right.region;
          });
        } else {
          right.region = plot.region;
        }
        sides--;
      }
    }
    plot.sides = sides;
  }
}
// console.log(map);
// console.log(regions);
// console.log({ regions: regions.length });
const prices = regions.map((region) =>
  region.length * region.reduce((a, b) => a + b.sides, 0)
);
console.log({ prices, total: prices.reduce((a, b) => a + b, 0) });
