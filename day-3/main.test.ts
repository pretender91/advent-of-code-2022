import { Rucksack } from "./rucksack.ts";
import { Item } from "./item.ts";
import {
  assertEquals,
  assertExists,
  assertThrows,
} from "https://deno.land/std@0.163.0/testing/asserts.ts";

Deno.test("Item can not be created with wrong values", () => {
  assertThrows(() => Item.fromString("0"));
  assertThrows(() => Item.fromString("-"));
  assertThrows(() => Item.fromString("az"));
  assertThrows(() => Item.fromString(""));
});

Deno.test("Item can be created with correct values", () => {
  const item1 = Item.fromString("a");
  const item2 = Item.fromString("A");
  const item3 = Item.fromString("z");
  const item4 = Item.fromString("Z");

  assertExists(item1);
  assertExists(item2);
  assertExists(item3);
  assertExists(item4);
});

Deno.test("Rucksack can not be created with wrong values", () => {
  assertThrows(() => new Rucksack([Item.fromString("a")]));
});

Deno.test("Rucksack can show duplicates", () => {
  const rucksack = new Rucksack([
    Item.fromString("a"),
    Item.fromString("b"),
    Item.fromString("c"),
    Item.fromString("a"),
  ]);

  assertEquals([Item.fromString("a")], rucksack.duplicates);
});
