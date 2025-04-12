import styles from "./styles.module.css";
import { Turn } from "../../constants/types.ts";

type LogProps = {
  turns: Turn[];
};

export const Log = ({ turns }: LogProps) => {
  return (
    <ul className={styles.list}>
      {turns.map((turn, index) => {
        return (
          <li key={index} className={styles.listItem}>
            {turn.playerName} ({turn.playerSymbol}) on Row: {turn.square.row + 1} - Column:{" "}
            {turn.square.col + 1}
          </li>
        );
      })}
    </ul>
  );
};
