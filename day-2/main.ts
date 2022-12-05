import { readLines } from "https://deno.land/std@0.163.0/io/buffer.ts";
import { Tournament } from "./tournament.ts";
import { Hand } from "./hand.ts";
import { Round } from "./round.ts";

const tournament = new Tournament();

const file = await Deno.open(
  `${new URL(".", import.meta.url).pathname}input.txt`,
  { read: true, write: false },
);

for await (const line of readLines(file)) {
  const [hand1, hand2] = line.split(" ");
  tournament.addRound(new Round(Hand.player1(hand1), Hand.player2(hand2)));
}

console.log(tournament.player2Outcome);
