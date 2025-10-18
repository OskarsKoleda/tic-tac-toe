import type { Turn } from "../../constants/types.ts";
import styles from "./styles.module.css";

type LogProps = {
  turns: Turn[];
};

export const Log = ({ turns }: LogProps) => {
  return (
    <ul className={styles.list}>
      {turns.map((turn) => {
        return (
          <li key={`${turn.square.row}-${turn.square.col}`} className={styles.listItem}>
            {turn.playerName} ({turn.playerSymbol}) on Row: {turn.square.row + 1} - Column:{" "}
            {turn.square.col + 1}
          </li>
        );
      })}
    </ul>
  );
};
