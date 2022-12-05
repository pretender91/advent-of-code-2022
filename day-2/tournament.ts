import { Round } from "./round.ts";

export class Tournament {
  private rounds: Round[] = [];

  public get player1Outcome() {
    return this.rounds.reduce(
      (outcome, round) => outcome + round.player1Outcome,
      0,
    );
  }

  public get player2Outcome() {
    return this.rounds.reduce(
      (outcome, round) => outcome + round.player2Outcome,
      0,
    );
  }

  public addRound(round: Round) {
    this.rounds.push(round);
  }
}
