import { DefaultRoundCalculator, RoundCalculator } from "./calculator.ts";
import { Round } from "./round.ts";

export class Tournament {
  private rounds: Round[] = [];

  public get player1Outcome() {
    return this.rounds.reduce(
      (outcome, round) =>
        outcome + this.roundCalculator.calculate(round).player1Outcome,
      0,
    );
  }

  public get player2Outcome() {
    return this.rounds.reduce(
      (outcome, round) =>
        outcome + this.roundCalculator.calculate(round).player2Outcome,
      0,
    );
  }

  constructor(
    private roundCalculator: RoundCalculator = new DefaultRoundCalculator(),
  ) {
  }

  public addRound(round: Round) {
    this.rounds.push(round);
  }
}
