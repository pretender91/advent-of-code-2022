import { Hand } from "./hand.ts";

export class Round {
  public get player1Outcome() {
    return this.player1Hand.score + this.player1Hand.compare(this.player2Hand);
  }

  public get player2Outcome() {
    return this.player2Hand.score + this.player2Hand.compare(this.player1Hand);
  }

  constructor(private player1Hand: Hand, private player2Hand: Hand) {
  }
}
