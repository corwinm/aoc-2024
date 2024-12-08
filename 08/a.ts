// import input from "./smallInput.ts";
import input from "./input.ts";

const map = input.split("\n").map((row) => row.split(""));
console.log(map);

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

const antinodes = new Set();

for (const [_letter, nodes] of nodeMap) {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;

      const node = nodes[i];
      const other = nodes[j];
      const antinode = { x: node.x, y: node.y };
      const differenceX = node.x - other.x;
      const differenceY = node.y - other.y;
      antinode.x = node.x + differenceX;
      antinode.y = node.y + differenceY;
      if (
        antinode.x > -1 && antinode.y > -1 && antinode.y < map.length &&
        antinode.x < map[0].length
      ) {
        antinodes.add(JSON.stringify(antinode));
      }
    }
  }
}

console.log("Count:", antinodes.size);
