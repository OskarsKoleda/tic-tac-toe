import * as React from "react";
import { useState } from "react";
import styles from "./styles.module.css";

interface EditableInputFieldProps {
  value: string;
  onInputChange?: (playerName: string) => void;
}

export const EditableInputField = React.memo(function EditableInputField({
  value: name,
  onInputChange,
}: EditableInputFieldProps) {
  const [playerName, setPlayerName] = useState(name);
  const [nameEditMode, setNameEditMode] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setNameEditMode(false);
      onInputChange?.(playerName);
    }
  };

  const handleButtonClick = () => {
    if (!nameEditMode) {
      setNameEditMode(true);
    } else {
      setNameEditMode(false);
      onInputChange?.(playerName);
    }
  };

  return (
    <div className={styles.player}>
      {nameEditMode ? (
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span>{playerName}</span>
      )}

      <button onClick={handleButtonClick}>{nameEditMode ? "Save" : "Edit"}</button>
    </div>
  );
});
