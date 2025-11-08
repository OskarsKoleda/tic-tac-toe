import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { GameBoard } from "./components/gameBoard/gameBoard.tsx";
import { Header } from "./components/header/header.tsx";
import { Log } from "./components/log/log.tsx";
import { Modal } from "./components/modal/modal.tsx";
import { initialGameBoard } from "./constants/constants.ts";
import type { Players, PlayerSymbol, Turns } from "./constants/types.ts";
import { PlayerSymbols } from "./constants/types.ts";
import styles from "./styles.module.css";
import { checkWinner, deriveActivePlayer } from "./utils/utils.ts";

const MAX_TURNS = 9;

const App = () => {
  const [gameTurns, setGameTurns] = useState<Turns>([]);
  const [players, setPlayers] = useState<Players>({
    [PlayerSymbols.X]: "Player 1",
    [PlayerSymbols.O]: "Player 2",
  });

  const onSquareClick = (rowIndex: number, colIndex: number) => {
    setGameTurns((prevTurns) => {
      const activePlayer = deriveActivePlayer(prevTurns);

      return [
        {
          square: { row: rowIndex, col: colIndex },
          playerSymbol: activePlayer,
          playerName: players[activePlayer],
        },
        ...prevTurns,
      ];
    });
  };

  const handlePlayerNameChange = (symbol: PlayerSymbol, name: string) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: name,
      };
    });
  };

  const gameBoard = useMemo(() => {
    const board = initialGameBoard.map((row) => [...row]);

    gameTurns.forEach((turn) => {
      const {
        square: { row, col },
        playerSymbol,
      } = turn;

      board[row][col] = playerSymbol;
    });

    return board;
  }, [gameTurns]);

  const winnerName = useMemo(() => {
    const winnerSymbol = checkWinner(gameBoard);

    return winnerSymbol ? players[winnerSymbol] : null;
  }, [gameBoard, players]);

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.header}>Tic Tac Toe</h1>
      <div className={styles.gameContainerStyles}>
        <Header players={players} onNameChange={handlePlayerNameChange} />
        <GameBoard turns={gameBoard} onSquareClick={onSquareClick} />
      </div>
      <Log turns={gameTurns} />

      {(winnerName || gameTurns.length === MAX_TURNS) &&
        createPortal(
          <Modal actionButtonLabel="New Game" onClose={() => setGameTurns([])}>
            {winnerName ? <p>The winner is {winnerName}!</p> : <p>Tie!</p>}
          </Modal>,
          document.body,
        )}
    </div>
  );
};

export default App;
