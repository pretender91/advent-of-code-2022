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

  static player1(shape: string) {
    switch (shape) {
      case "A":
        return new Hand(HandShape.Rock);
      case "B":
        return new Hand(HandShape.Paper);
      case "C":
        return new Hand(HandShape.Scissors);
      default:
        throw new Error("Invalid shape of hande.");
    }
  }

  static player2(shape: string) {
    switch (shape) {
      case "X":
        return new Hand(HandShape.Rock);
      case "Y":
        return new Hand(HandShape.Paper);
      case "Z":
        return new Hand(HandShape.Scissors);
      default:
        throw new Error("Invalid shape of hande.");
    }
  }
}
