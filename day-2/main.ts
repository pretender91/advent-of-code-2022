import { readLines } from "https://deno.land/std@0.163.0/io/buffer.ts";
import { Tournament } from "./tournament.ts";
import { Hand } from "./hand.ts";
import { Round } from "./round.ts";

const tournament1 = new Tournament();
const tournament2 = new Tournament();

const file = await Deno.open(
  `${new URL(".", import.meta.url).pathname}input.txt`,
  { read: true, write: false },
);

for await (const line of readLines(file)) {
  const [str1, str2] = line.split(" ");

  const hand1 = Hand.fromString(str1);

  const hand2ForTournament1 = Hand.fromString(str2);
  const hand2ForTournament2 = Hand.fromStrategy(str2, hand1);

  tournament1.addRound(new Round(hand1, hand2ForTournament1));
  tournament2.addRound(new Round(hand1, hand2ForTournament2));
}

console.log(tournament1.player2Outcome);
console.log(tournament2.player2Outcome);
