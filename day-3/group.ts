import { Item } from "./item.ts";
import { Rucksack } from "./rucksack.ts";

export class Group {
  private readonly rucksacks: Rucksack[];

  public get badges(): ReadonlyArray<Item> {
    if (!this.isFull) {
      throw new Error("Group is not full");
    }

    const [rucksack1, rucksack2, rucksack3] = this.rucksacks;

    const commonItems12 = new Set<Item>(
      rucksack2.uniqItems.filter((item) => rucksack1.hasItem(item)),
    );
    return rucksack3.uniqItems.filter((item) => commonItems12.has(item));
  }

  public get score(): number {
    return this.badges.reduce((score, item) => score + item.priority, 0);
  }

  public get isFull() {
    return this.rucksacks.length === 3;
  }
  constructor(rucksacks: Rucksack[] = []) {
    this.rucksacks = rucksacks;
  }

  public add(rucksack: Rucksack) {
    if (this.isFull) {
      throw new Error("Can not add rucksack cause group is full.");
    }

    this.rucksacks.push(rucksack);
  }
}

export class GroupsCoordinator {
  public readonly groups: Group[] = [];

  public addRucksack(rucksack: Rucksack) {
    const last = this.groups.at(-1);

    if (!last || last.isFull) {
      const group = new Group();
      group.add(rucksack);
      this.groups.push(group);
      return;
    }

    last.add(rucksack);
  }
}
