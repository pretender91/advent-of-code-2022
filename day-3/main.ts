import { Item } from "./item.ts";
import { Rucksack } from "./rucksack.ts";
import { readLines } from "https://deno.land/std@0.163.0/io/buffer.ts";

const file = await Deno.open(
  `${new URL(".", import.meta.url).pathname}input.txt`,
  { read: true, write: false },
);

let rucksacks: Rucksack[] = [];

for await (const line of readLines(file)) {
  rucksacks.push(
    new Rucksack(
      line.split("").map((char) => Item.fromString(char)),
    ),
  );
}

console.log(
  rucksacks.map((item) => item.duplicates).flat().reduce(
    (sum, item) => sum + item.priority,
    0,
  ),
);
