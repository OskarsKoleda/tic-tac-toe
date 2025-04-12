import styles from "./styles.module.css";
import { useState } from "react";
import * as React from "react";

type PlayerProps = {
  symbol: string;
  isActive: boolean;
};

export const Player = React.memo(function Player({ symbol, isActive }: PlayerProps) {
  const [playerName, setPlayerName] = useState("Dummy");
  const [nameEditMode, setNameEditMode] = useState(false);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setNameEditMode(false);
    }
  }

  function handleButtonClick() {
    if (!nameEditMode) {
      setNameEditMode(true);
    } else {
      setNameEditMode(false);
    }
  }

  return (
    <div className={`${styles.player} ${isActive ? styles.active : ""}`}>
      {nameEditMode ? (
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span>
          {playerName}: {symbol}
        </span>
      )}

      <button onClick={handleButtonClick}>{nameEditMode ? "Save" : "Edit"}</button>
    </div>
  );
});
