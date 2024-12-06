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

function isOnMap() {
  const { x, y } = position;
  return x > -1 && y > -1 && y < map.length && x < map.at(y)!.length;
}

while (isOnMap()) {
  map[position.y][position.x] = "X";
  switch (position.a) {
    case 0: {
      if (map.at(position.y - 1)?.at(position.x) === "#") {
        position.a = 90;
      } else {
        position.y = position.y - 1;
      }
      break;
    }
    case 90: {
      if (map.at(position.y)?.at(position.x + 1) === "#") {
        position.a = 180;
      } else {
        position.x = position.x + 1;
      }
      break;
    }
    case 180: {
      if (map.at(position.y + 1)?.at(position.x) === "#") {
        position.a = 270;
      } else {
        position.y = position.y + 1;
      }
      break;
    }
    case 270: {
      if (map.at(position.y)?.at(position.x - 1) === "#") {
        position.a = 0;
      } else {
        position.x = position.x - 1;
      }
      break;
    }
  }
}

const visited = map.reduce((sum, row) => {
  sum += row.reduce((rowSum, val) => {
    return val === "X" ? rowSum + 1 : rowSum;
  }, 0);
  return sum;
}, 0);
console.log({ visited });
