import { DefaultRoundCalculator } from "./calculator.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.163.0/testing/asserts.ts";
import { Hand, HandCompareResult, HandShape } from "./hand.ts";
import { Round } from "./round.ts";
import { Tournament } from "./tournament.ts";

Deno.test("Should create player hand from string", () => {
  const rockHand1 = Hand.fromString("A");
  const rockHand2 = Hand.fromString("X");
  assertEquals(rockHand1.shape, HandShape.Rock);
  assertEquals(rockHand2.shape, HandShape.Rock);

  const paperHand1 = Hand.fromString("B");
  const paperHand2 = Hand.fromString("Y");
  assertEquals(paperHand1.shape, HandShape.Paper);
  assertEquals(paperHand2.shape, HandShape.Paper);

  const scissorsHand1 = Hand.fromString("C");
  const scissorsHand2 = Hand.fromString("Z");
  assertEquals(scissorsHand1.shape, HandShape.Scissors);
  assertEquals(scissorsHand2.shape, HandShape.Scissors);
});

Deno.test("Hand should be comparable", () => {
  const rockHand = new Hand(HandShape.Rock);
  const paperHand = new Hand(HandShape.Paper);
  const scissorsHand = new Hand(HandShape.Scissors);

  assertEquals(rockHand.compare(rockHand), HandCompareResult.Draw);
  assertEquals(rockHand.compare(paperHand), HandCompareResult.Lose);
  assertEquals(rockHand.compare(scissorsHand), HandCompareResult.Win);

  assertEquals(paperHand.compare(paperHand), HandCompareResult.Draw);
  assertEquals(paperHand.compare(scissorsHand), HandCompareResult.Lose);
  assertEquals(paperHand.compare(rockHand), HandCompareResult.Win);

  assertEquals(scissorsHand.compare(scissorsHand), HandCompareResult.Draw);
  assertEquals(scissorsHand.compare(rockHand), HandCompareResult.Lose);
  assertEquals(scissorsHand.compare(paperHand), HandCompareResult.Win);
});

Deno.test("Hand should have a score", () => {
  const rockHand = new Hand(HandShape.Rock);
  const paperHand = new Hand(HandShape.Paper);
  const scissorsHand = new Hand(HandShape.Scissors);

  assertEquals(rockHand.score, 1);
  assertEquals(paperHand.score, 2);
  assertEquals(scissorsHand.score, 3);
});

Deno.test("Round should calculate player outcome", () => {
  const rockHand = new Hand(HandShape.Rock);
  const paperHand = new Hand(HandShape.Paper);
  const scissorsHand = new Hand(HandShape.Scissors);

  const defaultCalculator = new DefaultRoundCalculator();

  const round1 = new Round(rockHand, rockHand);
  assertEquals(defaultCalculator.calculate(round1).player1Outcome, 4);
  assertEquals(defaultCalculator.calculate(round1).player2Outcome, 4);

  const round2 = new Round(paperHand, paperHand);
  assertEquals(defaultCalculator.calculate(round2).player1Outcome, 5);
  assertEquals(defaultCalculator.calculate(round2).player2Outcome, 5);

  const round3 = new Round(scissorsHand, scissorsHand);
  assertEquals(defaultCalculator.calculate(round3).player1Outcome, 6);
  assertEquals(defaultCalculator.calculate(round3).player2Outcome, 6);

  const round4 = new Round(rockHand, paperHand);
  assertEquals(defaultCalculator.calculate(round4).player1Outcome, 1);
  assertEquals(defaultCalculator.calculate(round4).player2Outcome, 8);

  const round5 = new Round(rockHand, scissorsHand);
  assertEquals(defaultCalculator.calculate(round5).player1Outcome, 7);
  assertEquals(defaultCalculator.calculate(round5).player2Outcome, 3);

  const round6 = new Round(paperHand, rockHand);
  assertEquals(defaultCalculator.calculate(round6).player1Outcome, 8);
  assertEquals(defaultCalculator.calculate(round6).player2Outcome, 1);

  const round7 = new Round(paperHand, scissorsHand);
  assertEquals(defaultCalculator.calculate(round7).player1Outcome, 2);
  assertEquals(defaultCalculator.calculate(round7).player2Outcome, 9);

  const round8 = new Round(scissorsHand, rockHand);
  assertEquals(defaultCalculator.calculate(round8).player1Outcome, 3);
  assertEquals(defaultCalculator.calculate(round8).player2Outcome, 7);

  const round9 = new Round(scissorsHand, paperHand);
  assertEquals(defaultCalculator.calculate(round9).player1Outcome, 9);
  assertEquals(defaultCalculator.calculate(round9).player2Outcome, 2);
});

Deno.test("Tournament should calculate players outcomes", () => {
  const rockHand = new Hand(HandShape.Rock);
  const paperHand = new Hand(HandShape.Paper);
  const scissorsHand = new Hand(HandShape.Scissors);

  const round1 = new Round(rockHand, rockHand);
  const round2 = new Round(paperHand, scissorsHand);

  const defaultCalculator = new DefaultRoundCalculator();

  const tournament = new Tournament(defaultCalculator);
  tournament.addRound(round1);
  tournament.addRound(round2);

  assertEquals(
    tournament.player1Outcome,
    defaultCalculator.calculate(round1).player1Outcome +
      defaultCalculator.calculate(round2).player1Outcome,
  );
  assertEquals(
    tournament.player2Outcome,
    defaultCalculator.calculate(round1).player2Outcome +
      defaultCalculator.calculate(round2).player2Outcome,
  );
});

Deno.test("Hand strategies", () => {
  const rockHand = new Hand(HandShape.Rock);
  const paperHand = new Hand(HandShape.Paper);
  const scissorsHand = new Hand(HandShape.Scissors);

  assertThrows(() => Hand.fromStrategy("unknown", new Hand(HandShape.Paper)));

  assertEquals(Hand.fromStrategy("X", rockHand), scissorsHand);
  assertEquals(Hand.fromStrategy("X", paperHand), rockHand);
  assertEquals(Hand.fromStrategy("X", scissorsHand), paperHand);

  assertEquals(Hand.fromStrategy("Y", rockHand), rockHand);
  assertEquals(Hand.fromStrategy("Y", paperHand), paperHand);
  assertEquals(Hand.fromStrategy("Y", scissorsHand), scissorsHand);

  assertEquals(Hand.fromStrategy("Z", rockHand), paperHand);
  assertEquals(Hand.fromStrategy("Z", paperHand), scissorsHand);
  assertEquals(Hand.fromStrategy("Z", scissorsHand), rockHand);
});

Deno.test("Round strategy should be correctly calculated", () => {
  const round1 = new Round(
    Hand.fromString("A"),
    Hand.fromStrategy("Y", Hand.fromString("A")),
  );
  const round2 = new Round(
    Hand.fromString("B"),
    Hand.fromStrategy("X", Hand.fromString("B")),
  );
  const round3 = new Round(
    Hand.fromString("C"),
    Hand.fromStrategy("Z", Hand.fromString("C")),
  );

  const calculator = new DefaultRoundCalculator();

  assertEquals(calculator.calculate(round1).player2Outcome, 4);
  assertEquals(calculator.calculate(round2).player2Outcome, 1);
  assertEquals(calculator.calculate(round3).player2Outcome, 7);
});
