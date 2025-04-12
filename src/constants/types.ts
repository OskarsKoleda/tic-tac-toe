export type PlayerSymbol = "X" | "O";

export type SquareValue = PlayerSymbol | null;

export type Board = SquareValue[][];

export const PlayerSymbols: Record<PlayerSymbol, PlayerSymbol> = {
  X: "X",
  O: "O",
};

export interface Turn {
  square: {
    row: number;
    col: number;
  };
  playerSymbol: PlayerSymbol;
  playerName: string;
}

export type Turns = Array<Turn>;
