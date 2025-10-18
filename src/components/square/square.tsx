import xImg from "../../assets/close.png";
import oImg from "../../assets/letter-o.png";
import type { SquareValue } from "../../constants/types.ts";
import { PlayerSymbols } from "../../constants/types.ts";
import styles from "./styles.module.css";

interface SquareProps {
  symbol: SquareValue;
  onSquareClick: () => void;
}

export const Square = ({ symbol, onSquareClick }: SquareProps) => {
  const handleSquareClick = () => {
    if (symbol) {
      return;
    }

    onSquareClick();
  };

  const handleSquareKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSquareClick();
    }
  };

  return (
    <div
      tabIndex={0}
      onClick={handleSquareClick}
      onKeyDown={handleSquareKeyDown}
      className={styles.squareContainer}
    >
      <span className={`${styles.square} ${symbol ? styles.disabled : ""}`}>
        {symbol === PlayerSymbols.X ? (
          <img src={xImg} alt="cross" />
        ) : symbol === PlayerSymbols.O ? (
          <img src={oImg} alt="circle" />
        ) : null}
      </span>
    </div>
  );
};
