import styles from "./styles.module.css";
import xImg from "../../assets/close.png";
import oImg from "../../assets/letter-o.png";
import { useMemo } from "react";
import { PlayerSymbols } from "../../constants/types.ts";

type SquareProps = {
  onClick: () => void;
  symbol: string | null;
};

export const Square = ({ symbol, onClick }: SquareProps) => {
  const symbolToRender = useMemo(() => {
    if (!symbol) return null;

    return symbol === PlayerSymbols.X ? (
      <img src={xImg} alt={"cross"} />
    ) : (
      <img src={oImg} alt={"circle"} />
    );
  }, [symbol]);

  function handleClick() {
    if (symbolToRender) return;

    onClick();
  }

  return (
    <div onClick={handleClick} className={styles.squareContainer}>
      <span className={`${styles.square} ${symbolToRender ? styles.disabled : ""}`}>
        {symbolToRender}
      </span>
    </div>
  );
};
