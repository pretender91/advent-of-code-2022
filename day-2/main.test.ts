import { Tournament } from "./tournament.ts";
import { Hand, HandCompareResult, HandShape } from "./hand.ts";
import { Round } from "./round.ts";
import { assertEquals } from "https://deno.land/std@0.163.0/testing/asserts.ts";

Deno.test("Should create player1 hand", () => {
  const rockHand = Hand.player1("A");
  assertEquals(rockHand.shape, HandShape.Rock);

  const paperHand = Hand.player1("B");
  assertEquals(paperHand.shape, HandShape.Paper);

  const scissorsHand = Hand.player1("C");
  assertEquals(scissorsHand.shape, HandShape.Scissors);
});

Deno.test("Should create player2 hand", () => {
  const rockHand = Hand.player2("X");
  assertEquals(rockHand.shape, HandShape.Rock);

  const paperHand = Hand.player2("Y");
  assertEquals(paperHand.shape, HandShape.Paper);

  const scissorsHand = Hand.player2("Z");
  assertEquals(scissorsHand.shape, HandShape.Scissors);
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

  const round1 = new Round(rockHand, rockHand);
  assertEquals(round1.player1Outcome, 4);
  assertEquals(round1.player2Outcome, 4);

  const round2 = new Round(paperHand, paperHand);
  assertEquals(round2.player1Outcome, 5);
  assertEquals(round2.player2Outcome, 5);

  const round3 = new Round(scissorsHand, scissorsHand);
  assertEquals(round3.player1Outcome, 6);
  assertEquals(round3.player2Outcome, 6);

  const round4 = new Round(rockHand, paperHand);
  assertEquals(round4.player1Outcome, 1);
  assertEquals(round4.player2Outcome, 8);

  const round5 = new Round(rockHand, scissorsHand);
  assertEquals(round5.player1Outcome, 7);
  assertEquals(round5.player2Outcome, 3);

  const round6 = new Round(paperHand, rockHand);
  assertEquals(round6.player1Outcome, 8);
  assertEquals(round6.player2Outcome, 1);

  const round7 = new Round(paperHand, scissorsHand);
  assertEquals(round7.player1Outcome, 2);
  assertEquals(round7.player2Outcome, 9);

  const round8 = new Round(scissorsHand, rockHand);
  assertEquals(round8.player1Outcome, 3);
  assertEquals(round8.player2Outcome, 7);

  const round9 = new Round(scissorsHand, paperHand);
  assertEquals(round9.player1Outcome, 9);
  assertEquals(round9.player2Outcome, 2);
});

Deno.test("Tournament should calculate players outcomes", () => {
  const rockHand = new Hand(HandShape.Rock);
  const paperHand = new Hand(HandShape.Paper);
  const scissorsHand = new Hand(HandShape.Scissors);

  const round1 = new Round(rockHand, rockHand);
  const round2 = new Round(paperHand, scissorsHand);

  const tournament = new Tournament();
  tournament.addRound(round1);
  tournament.addRound(round2);

  assertEquals(
    tournament.player1Outcome,
    round1.player1Outcome + round2.player1Outcome,
  );
  assertEquals(
    tournament.player2Outcome,
    round1.player2Outcome + round2.player2Outcome,
  );
});
