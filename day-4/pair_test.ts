import { assertEquals } from "https://deno.land/std@0.163.0/testing/asserts.ts";
import { Section } from "./section.ts";
import { Pair } from "./pair.ts";

Deno.test("Pair can detect section full overlapping ", () => {
  const pair1 = new Pair(new Section(1, 4), new Section(2, 4));
  const pair2 = new Pair(new Section(1, 3), new Section(3, 4));

  assertEquals(pair1.isFullyOverlapped, true);
  assertEquals(pair2.isFullyOverlapped, false);
});

Deno.test("Pair can calculate the overlapping length", () => {
  const pair1 = new Pair(new Section(1, 4), new Section(2, 4));
  const pair2 = new Pair(new Section(1, 3), new Section(3, 4));

  assertEquals(pair1.overlapLength, 3);
  assertEquals(pair2.overlapLength, 1);
});
