// import input from "./smallInput.ts";
import input from "./input.ts";
// import input from "./largerExample.ts";

// Duplicate valid verticies example
// const input = `AAAAAA
// AAABBA
// AAABBA
// ABBAAA
// ABBAAA
// AAAAAA`;

interface Plot {
  x: number;
  y: number;
  val: string;
  sides: number;
  vert: { a: number; b: number; c: number; d: number };
  region: number;
}

const rawMap = input.split("\n").map((a) => a.split(""));
const map = rawMap.map((row, y) =>
  row.map((col, x): Plot => ({
    x,
    y,
    val: col,
    sides: 4,
    vert: { a: 1, b: 1, c: 1, d: 1 },
    region: -1,
  }))
);

const regions: Plot[][] = [];

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    const plot = map[y][x];
    if (plot.region < 0) {
      plot.region = regions.length;
      regions.push([]);
    }
    regions[plot.region].push(plot);
    let sides = plot.sides;
    // up
    const up = map[y - 1]?.[x] || {};
    if (y !== 0) {
      // If up is part of same region
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
    const down = map[y + 1]?.[x] || {};
    if (y !== map.length - 1) {
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
    const left = map[y]?.[x - 1] || {};
    if (x !== 0) {
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
    const right = map[y]?.[x + 1] || {};
    if (x !== map[y].length - 1) {
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
    const upRight = map[y - 1]?.[x + 1] || {};
    const upLeft = map[y - 1]?.[x - 1] || {};
    const downRight = map[y + 1]?.[x + 1] || {};
    const downLeft = map[y + 1]?.[x - 1] || {};
    if (
      up.val === plot.val && upRight.val === plot.val && right.val === plot.val
    ) {
      plot.vert.a = 0;
    } else if (
      up.val === plot.val && upRight.val !== plot.val && right.val !== plot.val
    ) {
      plot.vert.a = 0;
    } else if (
      up.val !== plot.val && upRight.val !== plot.val && right.val === plot.val
    ) {
      plot.vert.a = 0;
    } else if (
      up.val !== plot.val && upRight.val === plot.val && right.val !== plot.val
    ) {
      plot.vert.a = 1.1;
    }
    // b
    if (
      down.val === plot.val && downRight.val === plot.val &&
      right.val === plot.val
    ) {
      plot.vert.b = 0;
    } else if (
      down.val === plot.val && downRight.val !== plot.val &&
      right.val !== plot.val
    ) {
      plot.vert.b = 0;
    } else if (
      down.val !== plot.val && downRight.val !== plot.val &&
      right.val === plot.val
    ) {
      plot.vert.b = 0;
    } else if (
      down.val !== plot.val && downRight.val === plot.val &&
      right.val !== plot.val
    ) {
      plot.vert.b = 1.2;
    }
    // d
    if (
      up.val === plot.val && upLeft.val === plot.val && left.val === plot.val
    ) {
      plot.vert.d = 0;
    } else if (
      up.val === plot.val && upLeft.val !== plot.val && left.val !== plot.val
    ) {
      plot.vert.d = 0;
    } else if (
      up.val !== plot.val && upLeft.val !== plot.val && left.val === plot.val
    ) {
      plot.vert.d = 0;
    } else if (
      up.val !== plot.val && upLeft.val === plot.val &&
      left.val !== plot.val
    ) {
      plot.vert.d = 1.3;
    }
    // c
    if (
      down.val === plot.val && downLeft.val === plot.val &&
      left.val === plot.val
    ) {
      plot.vert.c = 0;
    } else if (
      down.val === plot.val && downLeft.val !== plot.val &&
      left.val !== plot.val
    ) {
      plot.vert.c = 0;
    } else if (
      down.val !== plot.val && downLeft.val !== plot.val &&
      left.val === plot.val
    ) {
      plot.vert.c = 0;
    } else if (
      down.val !== plot.val && downLeft.val === plot.val &&
      left.val !== plot.val
    ) {
      plot.vert.c = 1.4;
    }
  }
}

console.log(regions);

// Remove duplicate verticies
const prices = regions.map((region) => {
  const len = region.length;
  const verts = new Set<string>();
  for (const plot of region) {
    if (plot.vert.a) {
      verts.add(`${plot.x + 1}|${plot.y}|${plot.vert.a}`);
    }
    if (plot.vert.b) {
      verts.add(`${plot.x + 1}|${plot.y + 1}|${plot.vert.b}`);
    }
    if (plot.vert.c) {
      verts.add(`${plot.x}|${plot.y + 1}|${plot.vert.c}`);
    }
    if (plot.vert.d) {
      verts.add(`${plot.x}|${plot.y}|${plot.vert.d}`);
    }
  }
  return verts.size * len;
});

console.log({ prices, total: prices.reduce((a, b) => a + b, 0) });
