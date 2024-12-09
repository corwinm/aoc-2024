// import input from "./smallInput.ts";
import input from "./input.ts";

interface DiskFile {
  id?: number;
  size: number;
}

const expanded = input.split("").map<DiskFile>((num, idx) =>
  idx % 2 === 0 ? { id: idx / 2, size: Number(num) } : { size: Number(num) }
);

console.log(expanded);

let i = expanded.length - 1;
const expChars = expanded;

while (i > -1) {
  if (expChars[i].id === undefined) {
    i--;
    continue;
  }
  const available = expChars.findIndex((val) =>
    val.id === undefined && val.size >= expChars[i].size
  );
  if (available < 0 || available > i) {
    i--;
    continue;
  }

  const { size, id } = expChars[i];
  expChars[available].size -= size;
  expChars[i].id = undefined;
  expChars.splice(available, 0, { id, size });
  i = expChars.length - 1;
}
console.log("Compacted:");
console.log(
  expChars.map((df) => String(df.id ?? ".").repeat(df.size)).join(""),
);

const smallExpected = "00992111777.44.333....5555.6666.....8888..";
console.log(smallExpected);

const formatted = expChars.filter((val) => val.size).map((df) =>
  new Array<string>(df.size).fill(String(df.id ?? "."))
).flat();

const checksum = formatted.reduce(
  (sum, cur, idx) => cur === "." ? sum : sum + (Number(cur) * idx),
  0,
);
console.log({ checksum });
