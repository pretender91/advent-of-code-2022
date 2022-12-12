import { Section } from "./section.ts";

export class Pair {
  constructor(
    public readonly section1: Section,
    public readonly section2: Section,
  ) {
  }

  public get isFullyOverlapped() {
    return this.section1.isInsideOf(this.section2) ||
      this.section2.isInsideOf(this.section1);
  }

  public get isOverlapped() {
    return this.overlapLength > 0;
  }

  public get overlapLength() {
    return this.section1.overlapLength(this.section2);
  }
}
