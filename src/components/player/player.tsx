import { useState } from "react";
import * as React from "react";
import type { PlayerSymbol } from "../../constants/types.ts";
import styles from "./styles.module.css";

type PlayerProps = {
  name: string;
  symbol: PlayerSymbol;
  isActive: boolean;
  onChangeName: (symbol: PlayerSymbol, playerName: string) => void;
};

export const Player = React.memo(function Player({
  name,
  symbol,
  isActive,
  onChangeName,
}: PlayerProps) {
  const [playerName, setPlayerName] = useState(name);
  const [nameEditMode, setNameEditMode] = useState(false);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setNameEditMode(false);
      onChangeName(symbol, playerName);
    }
  }

  function handleButtonClick() {
    if (!nameEditMode) {
      setNameEditMode(true);
    } else {
      setNameEditMode(false);
      onChangeName(symbol, playerName);
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
