import { Round } from "./round.ts";

export interface RoundCalculator {
  calculate(round: Round): { player1Outcome: number; player2Outcome: number };
}

export class DefaultRoundCalculator implements RoundCalculator {
  public calculate(
    round: Round,
  ): { player1Outcome: number; player2Outcome: number } {
    return {
      get player1Outcome() {
        return round.hand1.score +
          round.hand1.compare(round.hand2);
      },
      get player2Outcome() {
        return round.hand2.score +
          round.hand2.compare(round.hand1);
      },
    };
  }
}
