// Puzzle input
const input = "572556 22 0 528 4679021 1 10725 2790";
// Small input
// const input = "125 17";

const stones = input.split(" ");
const blinks = 75; // Part a 25, Part b 75

let stonesCache = new Map<number, number>();

function add(num: number) {
  stonesCache.set(num, (stonesCache.get(num) ?? 0) + 1);
}

stones.map(Number).forEach(add);

console.log(stonesCache);

for (let b = 0; b < blinks; b++) {
  console.log("Blink:", b, "Stones:", stonesCache.size);
  const newCache = new Map<number, number>();
  for (const [stone, count] of stonesCache) {
    if (stone === 0) {
      // If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
      newCache.set(1, (newCache.get(1) ?? 0) + count);
    } else if (String(stone).length % 2 === 0) {
      // If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
      const str = String(stone);
      const [a, b] = [
        str.substring(0, str.length / 2),
        str.substring(str.length / 2),
      ].map((st) => Number(st));

      newCache.set(a, (newCache.get(a) ?? 0) + count);
      newCache.set(b, (newCache.get(b) ?? 0) + count);
    } else {
      // If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
      newCache.set(
        2024 * stone,
        (newCache.get(2024 * stone) ?? 0) + count,
      );
    }
  }
  stonesCache = newCache;
  console.log(stonesCache);
}
console.log({ count: stonesCache.entries().reduce((a, [_, b]) => a + b, 0) });
