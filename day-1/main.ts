import { readLines } from "https://deno.land/std@0.163.0/io/buffer.ts";

type Elf = number;
type Calories = number;

interface ElfCaloriesTable {
  addCalories(elf: Elf, calories: Calories): void;
  getCalories(elf: Elf): Calories;
  max(): Calories;
}

export class InMemoryElfCaloriesTable implements ElfCaloriesTable {
  private caloriesByElf: Map<Elf, Calories> = new Map();

  public addCalories(elf: Elf, calories: Calories): void {
    this.caloriesByElf.set(elf, this.getCalories(elf) + calories);
  }

  public getCalories(elf: Elf): Calories {
    return this.caloriesByElf.get(elf) ?? 0;
  }

  public max(): Calories {
    return Math.max(...this.caloriesByElf.values());
  }

  static async fromFile(file: Deno.FsFile) {
    const table = new this();

    let currentElf = 0;

    for await (const line of readLines(file)) {
      if (line.trim() === "") {
        currentElf += 1;
        continue;
      }

      const calories = Number.parseInt(line.trim());

      if (!Number.isInteger(calories)) {
        throw new Error(`Invalid input: "${line}". Should be an integer`);
      }

      table.addCalories(currentElf, calories);
    }

    return table;
  }
}

const file = await Deno.open(
  `${new URL(".", import.meta.url).pathname}input.txt`,
);

const elfCaloriesTable = await InMemoryElfCaloriesTable.fromFile(file);

console.log(elfCaloriesTable.max());
