import type { Players, PlayerSymbol } from "../../constants/types";
import { PlayerSymbols } from "../../constants/types";
import { EditableInputField } from "../editableInputField/editableInputField";
import styles from "./styles.module.css";

interface HeaderProps {
  players: Players;
  onNameChange: (symbol: PlayerSymbol, playerName: string) => void;
}

export const Header = ({ players, onNameChange }: HeaderProps) => {
  return (
    <div className={styles.playersContainer}>
      <div className={styles.inputFieldContainer}>
        <EditableInputField
          value={players[PlayerSymbols.X]}
          onInputChange={(newName) => onNameChange(PlayerSymbols.X, newName)}
        />
        <b>{PlayerSymbols.X}</b>
      </div>

      <div className={styles.inputFieldContainer}>
        <EditableInputField
          value={players[PlayerSymbols.O]}
          onInputChange={(newName) => onNameChange(PlayerSymbols.O, newName)}
        />
        <b>{PlayerSymbols.O}</b>
      </div>
    </div>
  );
};
