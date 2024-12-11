// Puzzle input
const input = "572556 22 0 528 4679021 1 10725 2790";
// Small input
// const input = "125 17";

const stones = input.split(" ");
const blinks = 25; // Part a 25, Part b 75

for (let b = 0; b < blinks; b++) {
  console.log("Blink:", b, "Stones:", stones.length);
  for (let i = stones.length; i--;) {
    const stone = stones[i];
    if (stone === "0") {
      // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
      stones[i] = "1";
    } else if (stone.length % 2 === 0) {
      // If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
      const halves = [
        stone.substring(0, stone.length / 2),
        stone.substring(stone.length / 2),
      ].map((st) => Number(st).toString());
      stones.splice(i, 1, ...halves);
    } else {
      // If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
      stones[i] = String(2024 * Number(stone));
    }
  }
}
console.log({ count: stones.length });
