import input from "./input.ts";

const puzzle = input.split("\n");
const height = puzzle.length;
const width = puzzle.at(0)!.length;

console.log({ height, width });

function matches(x: number, y: number) {
  if (puzzle.at(y)!.at(x) !== "A") return 0;
  let matches = 0;

  if (
    puzzle.at(y - 1)?.at(x - 1) === "M" && puzzle.at(y + 1)?.at(x + 1) === "S"
  ) {
    matches++;
  }
  if (
    puzzle.at(y - 1)?.at(x - 1) === "S" && puzzle.at(y + 1)?.at(x + 1) === "M"
  ) {
    matches++;
  }
  if (
    puzzle.at(y - 1)?.at(x + 1) === "M" && puzzle.at(y + 1)?.at(x - 1) === "S"
  ) {
    matches++;
  }
  if (
    puzzle.at(y - 1)?.at(x + 1) === "S" && puzzle.at(y + 1)?.at(x - 1) === "M"
  ) {
    matches++;
  }
  return matches === 2 ? 1 : 0;
}

let result = 0;
for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < puzzle.at(y)!.length - 1; x++) {
    result += matches(x, y);
  }
}
console.log({ result });
