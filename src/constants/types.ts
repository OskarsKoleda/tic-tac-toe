export type PlayerSymbol = "X" | "O";

export type SquareValue = PlayerSymbol | null;

export type Board = SquareValue[][];

export const PlayerSymbols: Record<PlayerSymbol, PlayerSymbol> = {
  X: "X",
  O: "O",
};

export interface Players {
  [PlayerSymbols.X]: string;
  [PlayerSymbols.O]: string;
}

export interface Turn {
  square: SquarePosition;
  playerSymbol: PlayerSymbol;
  playerName: string;
}

interface SquarePosition {
  row: number;
  col: number;
}

export type Turns = Array<Turn>;
