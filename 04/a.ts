import input from "./input.ts";

const puzzle = input.split("\n");
const height = puzzle.length;
const width = puzzle.at(0)!.length;

console.log({ height, width });

function matches(x: number, y: number) {
  if (puzzle.at(y)!.at(x) !== "X") return 0;
  let matches = 0;

  // 1. N Check if can fit vertically up
  if (y > 2) {
    if (
      puzzle.at(y - 1)?.at(x) === "M" &&
      puzzle.at(y - 2)?.at(x) === "A" &&
      puzzle.at(y - 3)?.at(x) === "S"
    ) {
      matches++;
    }
  }
  // 2. S Check if can fit vertically down
  if (y < (height - 2)) {
    if (
      puzzle.at(y + 1)?.at(x) === "M" &&
      puzzle.at(y + 2)?.at(x) === "A" &&
      puzzle.at(y + 3)?.at(x) === "S"
    ) {
      matches++;
    }
  }
  // 3. W Check if can fit horizontally left
  if (x > 2) {
    if (
      puzzle.at(y)?.at(x - 1) === "M" &&
      puzzle.at(y)?.at(x - 2) === "A" &&
      puzzle.at(y)?.at(x - 3) === "S"
    ) {
      matches++;
    }
  }
  // 4. E Check if can fit horizontally right
  if (x < (width - 2)) {
    if (
      puzzle.at(y)?.at(x + 1) === "M" &&
      puzzle.at(y)?.at(x + 2) === "A" &&
      puzzle.at(y)?.at(x + 3) === "S"
    ) {
      matches++;
    }
  }
  // 5. NW check if can fit up and left
  if (x > 2 && y > 2) {
    if (
      puzzle.at(y - 1)?.at(x - 1) === "M" &&
      puzzle.at(y - 2)?.at(x - 2) === "A" &&
      puzzle.at(y - 3)?.at(x - 3) === "S"
    ) {
      matches++;
    }
  }
  // 6. NE check if can fit up and rigth
  if (x < (width - 2) && y > 2) {
    if (
      puzzle.at(y - 1)?.at(x + 1) === "M" &&
      puzzle.at(y - 2)?.at(x + 2) === "A" &&
      puzzle.at(y - 3)?.at(x + 3) === "S"
    ) {
      matches++;
    }
  }
  // 7. SW check if can fit down and left
  if (x > 2 && y < (height - 2)) {
    if (
      puzzle.at(y + 1)?.at(x - 1) === "M" &&
      puzzle.at(y + 2)?.at(x - 2) === "A" &&
      puzzle.at(y + 3)?.at(x - 3) === "S"
    ) {
      matches++;
    }
  }
  // 8. SE check if can fit down and rigth
  if (x < (width - 2) && y < (height - 2)) {
    if (
      puzzle.at(y + 1)?.at(x + 1) === "M" &&
      puzzle.at(y + 2)?.at(x + 2) === "A" &&
      puzzle.at(y + 3)?.at(x + 3) === "S"
    ) {
      matches++;
    }
  }

  return matches;
}

let result = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < puzzle.at(y)!.length; x++) {
    result += matches(x, y);
  }
}
console.log({ result });
