export class Section {
  constructor(public readonly start: number, public readonly end: number) {
    if (start > end) {
      throw new Error(`start(${start}) must be less or equal than end(${end})`);
    }
  }

  public get length() {
    return this.end - this.start + 1;
  }

  public isInsideOf(other: Section) {
    return this.start >= other.start && this.end <= other.end;
  }

  public isOverlappingWith(other: Section) {
    if (this.start > other.end) {
      return false;
    }

    if (this.end < other.start) {
      return false;
    }

    return true;
  }

  public overlapLength(other: Section) {
    if (!this.isOverlappingWith(other)) {
      return 0;
    }

    const start = Math.max(this.start, other.start);
    const end = Math.min(this.end, other.end);

    return end - start + 1;
  }
}
