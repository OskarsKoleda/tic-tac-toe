import type { Board } from "../../constants/types.ts";
import { Square } from "../square/square.tsx";
import styles from "./styles.module.css";

interface GameBoardProps {
  turns: Board;
  onSquareClick: (row: number, col: number) => void;
}

export const GameBoard = ({ turns, onSquareClick }: GameBoardProps) => {
  return (
    <div className={styles.gameBoard}>
      {turns.map((row, rowIndex) =>
        row.map((playerSymbol, colIndex) => (
          <Square
            onSquareClick={() => onSquareClick(rowIndex, colIndex)}
            key={`${rowIndex}-${colIndex}`}
            symbol={playerSymbol}
          />
        )),
      )}
    </div>
  );
};
