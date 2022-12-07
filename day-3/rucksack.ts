import { Item } from "./item.ts";

export class Rucksack {
  private readonly part1: ReadonlyArray<Item>;
  private readonly part2: ReadonlyArray<Item>;
  private itemsLookupIndex: Map<Item, boolean>;

  public get duplicates(): ReadonlyArray<Item> {
    const duplicates = new Set<Item>();
    const itemsMap = new Map(this.part1.map((item) => [item, true]));

    this.part2.forEach((item) => {
      if (itemsMap.has(item)) {
        duplicates.add(item);
      }
    });

    return Array.from(duplicates);
  }

  public get uniqItems(): ReadonlyArray<Item> {
    return Array.from(this.itemsLookupIndex.keys());
  }

  constructor(items: Item[]) {
    if (items.length % 2 !== 0) {
      throw new Error("Invalid items number");
    }

    this.part1 = items.slice(0, items.length / 2);
    this.part2 = items.slice(items.length / 2);

    this.itemsLookupIndex = new Map(items.map((item) => [item, true]));
  }

  public hasItem(item: Item): boolean {
    return this.itemsLookupIndex.has(item);
  }
}
