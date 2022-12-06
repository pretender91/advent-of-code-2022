export class Item {
  public readonly value: string;

  public get priority(): number {
    return Item.priorityByChar.get(this.value) ?? 0;
  }

  private constructor(value: string) {
    if (value.length === 0) {
      throw new Error("Passed value should not be empty");
    }

    if (value.length > 1) {
      throw new Error("Passed value should have only one character");
    }

    if (!Item.allowedChars.includes(value)) {
      throw new Error(
        `Invalid Item: "${value}", allowed items: [${
          Item.allowedChars.join(", ")
        }]`,
      );
    }

    this.value = value;
  }

  private static cache = new Map<string, Item>();

  static fromString(value: string): Item {
    const fromCache = Item.cache.get(value);

    if (fromCache) {
      return fromCache;
    }

    const item = new Item(value);

    Item.cache.set(value, item);

    return item;
  }

  static priorityByChar: Map<string, number>;
  static allowedChars: string[];

  static {
    const priorityByChar = new Map<string, number>();

    let priority = 1;
    for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
      const char = String.fromCharCode(i);
      priorityByChar.set(char, priority);
      priority = priority + 1;
    }

    for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
      const char = String.fromCharCode(i);
      priorityByChar.set(char, priority);
      priority = priority + 1;
    }

    Item.priorityByChar = priorityByChar;
    Item.allowedChars = Array.from(priorityByChar.keys());
  }
}
