import { Turn } from "../../App.tsx";
import styles from "./styles.module.css";

type LogProps = {
  turns: Turn[];
};

export const Log = ({ turns }: LogProps) => {
  return (
    <ul className={styles.list}>
      {turns.map((turn, index) => {
        return (
          <li key={index} className={styles.listItem}>
            {turn.player} on Row: {turn.square.row + 1} - Column: {turn.square.col + 1}
          </li>
        );
      })}
    </ul>
  );
};
