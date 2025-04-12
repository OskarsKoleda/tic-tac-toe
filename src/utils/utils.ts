import { PlayerSymbol, PlayerSymbols, SquareValue, Turns } from "../constants/types.ts";
import { WINNING_COMBINATIONS } from "../constants/constants.ts";

export function deriveActivePlayer(gameTurns: Turns) {
  return gameTurns.length > 0 && gameTurns[0].playerSymbol === PlayerSymbols.X
    ? PlayerSymbols.O
    : PlayerSymbols.X;
}

export function checkWinner(gameBoard: SquareValue[][]): PlayerSymbol | null {
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      return firstSquareSymbol;
    }
  }

  return null;
}
