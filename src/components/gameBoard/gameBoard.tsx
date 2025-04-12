import { Square } from "../square/square.tsx";
import styles from "./styles.module.css";
import { Board } from "../../constants/types.ts";

type GameBoardProps = {
  turns: Board;
  handleSelectSquare: (row: number, col: number) => void;
};

export const GameBoard = ({ turns, handleSelectSquare }: GameBoardProps) => {
  return (
    <div className={styles.gameBoard}>
      {turns.map((row, rowIndex) =>
        row.map((playerSymbol, colIndex) => {
          return (
            <Square
              onClick={() => handleSelectSquare(rowIndex, colIndex)}
              key={colIndex}
              symbol={playerSymbol}
            />
          );
        }),
      )}
    </div>
  );
};
