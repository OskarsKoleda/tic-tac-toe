import type { Board } from "../../constants/types.ts";
import { Square } from "../square/square.tsx";
import styles from "./styles.module.css";

interface GameBoardProps {
  turns: Board;
  handleSelectSquare: (row: number, col: number) => void;
}

export const GameBoard = ({ turns, handleSelectSquare }: GameBoardProps) => {
  return (
    <div className={styles.gameBoard}>
      {turns.map((row, rowIndex) =>
        row.map((playerSymbol, colIndex) => (
          <Square
            onSquareClick={() => handleSelectSquare(rowIndex, colIndex)}
            key={`${rowIndex}-${colIndex}`}
            symbol={playerSymbol}
          />
        )),
      )}
    </div>
  );
};
