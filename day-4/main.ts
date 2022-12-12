import { Pair } from "./pair.ts";
import { Section } from "./section.ts";
import { readLines } from "https://deno.land/std@0.163.0/io/buffer.ts";

const file = await Deno.open(
  `${new URL(".", import.meta.url).pathname}input.txt`,
  { read: true, write: false },
);

const pairs: Pair[] = [];

for await (const line of readLines(file)) {
  const [pair1, pair2] = line.split(",");
  const [section1Start, section1End] = pair1.split("-");
  const [section2Start, section2End] = pair2.split("-");

  pairs.push(
    new Pair(
      new Section(parseInt(section1Start), parseInt(section1End)),
      new Section(parseInt(section2Start), parseInt(section2End)),
    ),
  );
}

console.log(
  "Fully overlapped pairs:",
  pairs.reduce((sum, pair) => sum + Number(pair.isFullyOverlapped), 0),
);
console.log(
  "All overlapping length:",
  pairs.reduce((sum, pair) => sum + Number(pair.isOverlapped), 0),
);
