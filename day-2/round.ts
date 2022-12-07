import { Hand } from "./hand.ts";

export class Round {
  constructor(
    public readonly hand1: Hand,
    public readonly hand2: Hand,
  ) {
  }
}
