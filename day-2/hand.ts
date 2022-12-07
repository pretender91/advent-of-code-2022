export enum HandCompareResult {
  Lose = 0,
  Draw = 3,
  Win = 6,
}

export enum HandShape {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

export class Hand {
  public get score(): number {
    return this.shape;
  }

  constructor(public readonly shape: HandShape) {
  }

  public compare(other: Hand): HandCompareResult {
    if (this.shape === other.shape) {
      return HandCompareResult.Draw;
    }

    if (this.shape === HandShape.Paper && other.shape === HandShape.Scissors) {
      return HandCompareResult.Lose;
    }

    if (this.shape === HandShape.Rock && other.shape === HandShape.Paper) {
      return HandCompareResult.Lose;
    }

    if (this.shape === HandShape.Scissors && other.shape === HandShape.Rock) {
      return HandCompareResult.Lose;
    }

    return HandCompareResult.Win;
  }

  static fromString(shape: string) {
    switch (shape) {
      case "A":
      case "X":
        return new Hand(HandShape.Rock);
      case "B":
      case "Y":
        return new Hand(HandShape.Paper);
      case "C":
      case "Z":
        return new Hand(HandShape.Scissors);
      default:
        throw new Error("Invalid shape of hande.");
    }
  }

  static winHandFor(hand: Hand): Hand {
    switch (hand.shape) {
      case HandShape.Rock:
        return new Hand(HandShape.Paper);
      case HandShape.Paper:
        return new Hand(HandShape.Scissors);
      case HandShape.Scissors:
        return new Hand(HandShape.Rock);
    }
  }

  static loseHandFor(hand: Hand): Hand {
    switch (hand.shape) {
      case HandShape.Rock:
        return new Hand(HandShape.Scissors);
      case HandShape.Paper:
        return new Hand(HandShape.Rock);
      case HandShape.Scissors:
        return new Hand(HandShape.Paper);
    }
  }

  static drawHandFor(hand: Hand): Hand {
    return new Hand(hand.shape);
  }

  static fromStrategy(strategy: string, oppositeHand: Hand) {
    switch (strategy) {
      case "X":
        return Hand.loseHandFor(oppositeHand);
      case "Y":
        return Hand.drawHandFor(oppositeHand);
      case "Z":
        return Hand.winHandFor(oppositeHand);
      default:
        throw new Error("Unknown strategy");
    }
  }
}
