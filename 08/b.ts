/**
 * This one ended up taking me a long time and had lots of janky things going on.
 * Don't expect this one to be an easy one to follow
 */

// import input from "./smallInputT.ts";
// import input from "./smallInputB.ts";
import input from "./input.ts";

const map = input.split("\n").map((row) => row.split(""));

const nodeMap = new Map<string, { x: number; y: number }[]>();

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    const letter = map[y][x];
    if (letter !== ".") {
      if (nodeMap.has(letter)) {
        nodeMap.get(letter)!.push({ x, y });
      } else {
        nodeMap.set(letter, [{ x, y }]);
      }
    }
  }
}
console.log(nodeMap);

const antinodes = new Set<string>();

function caclulateAntinode(
  node: { x: number; y: number },
  other: { x: number; y: number },
) {
  const differenceX = other.x > node.x ? other.x - node.x : node.x - other.x;
  const differenceY = other.x > node.x ? other.y - node.y : node.y - other.y;

  for (let k = -100; k < 100; k++) {
    const newX = node.x + differenceX * k;
    const newY = node.y + differenceY * k;

    if (newX >= 0 && newX < map[0].length && newY >= 0 && newY < map.length) {
      antinodes.add(JSON.stringify({ x: newX, y: newY }));
    }
  }
}

for (const [_letter, nodes] of nodeMap) {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i; j < nodes.length; j++) {
      if (i === j) continue;
      const node = nodes[i];
      const other = nodes[j];
      caclulateAntinode(node, other);
    }
  }
}
const problems = [];
for (let y = 0; y < map.length; y++) {
  let row = "";
  for (let x = 0; x < map[y].length; x++) {
    const val = map[y][x];
    if (antinodes.has(JSON.stringify({ x, y }))) {
      row += "#";
    } else {
      if (val !== ".") problems.push({ x, y, val });
      row += val;
    }
  }
  console.log(row);
}

console.log({ antinodes, problems });
console.log("Count:", antinodes.size);
