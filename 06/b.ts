import input from "./input.ts";

const map = input.split("\n").map((row) => row.split(""));

const position = { x: -1, y: -1, a: 0 };

map.find((row, y) => {
  const match = row.indexOf("^");
  if (match > -1) {
    position.x = match;
    position.y = y;
    return true;
  }
  return false;
});
console.log(position);
const startX = position.x;
const startY = position.y;

function isOnMap() {
  const { x, y } = position;
  return x > -1 && y > -1 && y < map.length && x < map.at(y)!.length;
}
function isLoop() {
  // If I run into obstruction twice, I'm in a loop
  const facedNewObstruction = new Map<string, number>();
  while (isOnMap()) {
    map[position.y][position.x] = "X";
    switch (position.a) {
      case 0: {
        if (map.at(position.y - 1)?.at(position.x) === "#") {
          const timesTurnedHere = facedNewObstruction.get(
            `${position.x}|${position.y}|${position.a}`,
          );
          if (timesTurnedHere && timesTurnedHere > 0) {
            return true;
          }
          facedNewObstruction.set(
            `${position.x}|${position.y}|${position.a}`,
            1,
          );
          position.a = 90;
        } else {
          position.y = position.y - 1;
        }
        break;
      }
      case 90: {
        if (map.at(position.y)?.at(position.x + 1) === "#") {
          const timesTurnedHere = facedNewObstruction.get(
            `${position.x}|${position.y}|${position.a}`,
          );
          if (timesTurnedHere && timesTurnedHere > 0) {
            return true;
          }
          facedNewObstruction.set(
            `${position.x}|${position.y}|${position.a}`,
            1,
          );
          position.a = 180;
        } else {
          position.x = position.x + 1;
        }
        break;
      }
      case 180: {
        if (map.at(position.y + 1)?.at(position.x) === "#") {
          const timesTurnedHere = facedNewObstruction.get(
            `${position.x}|${position.y}|${position.a}`,
          );
          if (timesTurnedHere && timesTurnedHere > 0) {
            return true;
          }
          facedNewObstruction.set(
            `${position.x}|${position.y}|${position.a}`,
            1,
          );
          position.a = 270;
        } else {
          position.y = position.y + 1;
        }
        break;
      }
      case 270: {
        if (map.at(position.y)?.at(position.x - 1) === "#") {
          const timesTurnedHere = facedNewObstruction.get(
            `${position.x}|${position.y}|${position.a}`,
          );
          if (timesTurnedHere && timesTurnedHere > 0) {
            return true;
          }
          facedNewObstruction.set(
            `${position.x}|${position.y}|${position.a}`,
            1,
          );
          position.a = 0;
        } else {
          position.x = position.x - 1;
        }
        break;
      }
    }
  }
  return false;
}

let result = 0;

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (x === startX && y === startY) continue;
    if (map[y][x] === "#") continue;

    const origional = map[y][x];
    map[y][x] = "#";
    if (isLoop()) {
      result++;
    }
    map[y][x] = origional;
    position.x = startX;
    position.y = startY;
    position.a = 0;
  }
}
console.log({ result });
