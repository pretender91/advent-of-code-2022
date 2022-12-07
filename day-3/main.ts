import { GroupsCoordinator } from "./group.ts";
import { Item } from "./item.ts";
import { Rucksack } from "./rucksack.ts";
import { readLines } from "https://deno.land/std@0.163.0/io/buffer.ts";

const file = await Deno.open(
  `${new URL(".", import.meta.url).pathname}input.txt`,
  { read: true, write: false },
);

const rucksacks: Rucksack[] = [];
const groupCoordinator = new GroupsCoordinator();

for await (const line of readLines(file)) {
  const rucksack = new Rucksack(
    line.split("").map((char) => Item.fromString(char)),
  );
  rucksacks.push(rucksack);
  groupCoordinator.addRucksack(rucksack);
}

console.log(
  rucksacks.map((item) => item.duplicates).flat().reduce(
    (sum, item) => sum + item.priority,
    0,
  ),
);

console.log(
  groupCoordinator.groups.reduce((score, group) => score + group.score, 0),
);
