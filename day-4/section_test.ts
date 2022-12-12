import {
  assertEquals,
  assertExists,
  assertThrows,
} from "https://deno.land/std@0.163.0/testing/asserts.ts";
import { Section } from "./section.ts";

Deno.test("Section should be constructable", () => {
  assertThrows(() => new Section(2, 1));
  assertExists(new Section(0, 0));
  assertExists(new Section(1, 2));
});

Deno.test("Section can be inside of another section", () => {
  const section1 = new Section(1, 3);
  const section2 = new Section(2, 4);
  const section3 = new Section(2, 3);

  assertEquals(section1.isInsideOf(section2), false);
  assertEquals(section1.isInsideOf(section3), false);
  assertEquals(section2.isInsideOf(section1), false);
  assertEquals(section3.isInsideOf(section1), true);
});

Deno.test("Section can be overlapping with another section", () => {
  const section1 = new Section(1, 3);
  const section2 = new Section(2, 4);
  const section3 = new Section(2, 3);
  const section4 = new Section(4, 5);

  assertEquals(section1.isOverlappingWith(section2), true);
  assertEquals(section1.isOverlappingWith(section3), true);
  assertEquals(section2.isOverlappingWith(section1), true);
  assertEquals(section3.isOverlappingWith(section1), true);
  assertEquals(section1.isOverlappingWith(section4), false);
  assertEquals(section4.isOverlappingWith(section1), false);
  assertEquals(section2.isOverlappingWith(section4), true);
  assertEquals(section4.isOverlappingWith(section2), true);
});

Deno.test("Get the overlapping length of two sections", () => {
  const section1 = new Section(1, 3);
  const section2 = new Section(2, 4);
  const section3 = new Section(4, 5);

  assertEquals(section1.overlapLength(section2), 2);
  assertEquals(section1.overlapLength(section3), 0);
  assertEquals(section2.overlapLength(section1), 2);
  assertEquals(section3.overlapLength(section1), 0);
  assertEquals(section2.overlapLength(section3), 1);
});
