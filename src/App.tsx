import { GameBoard } from "./components/gameBoard/gameBoard.tsx";
import styles from "./styles.module.css";
import { useMemo, useState } from "react";
import { Log } from "./components/log/log.tsx";
import { Player } from "./components/player/player.tsx";
import { PlayerSymbol, PlayerSymbols, Turns } from "./constants/types.ts";
import { GameOver } from "./components/gameOver/gameOver.tsx";
import { checkWinner, deriveActivePlayer } from "./utils/utils.ts";
import { createPortal } from "react-dom";
import { initialGameBoard } from "./constants/constants.ts";

function App() {
  const [gameTurns, setGameTurns] = useState<Turns>([]);
  const currentPlayer = deriveActivePlayer(gameTurns);
  const [players, setPlayers] = useState({
    [PlayerSymbols.X]: "Player 1",
    [PlayerSymbols.O]: "Player 2",
  });

  function handleSelectSquare(rowIndex: number, colIndex: number) {
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
  }

  function handlePlayerNameChange(symbol: PlayerSymbol, name: string) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: name,
      };
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

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
  }, [gameBoard]);

  const isDraw = useMemo(() => {
    if (winnerName) return false;

    return gameTurns.length === 9;
  }, [gameTurns, winnerName]);

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.header}>Tic Tac Toe</h1>
      <div className={styles.gameContainerStyles}>
        <ol className={styles.playersContainer}>
          <Player
            name={players[PlayerSymbols.X]}
            symbol={PlayerSymbols.X}
            isActive={currentPlayer === PlayerSymbols.X}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            name={players[PlayerSymbols.O]}
            symbol={PlayerSymbols.O}
            isActive={currentPlayer === PlayerSymbols.O}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        <GameBoard turns={gameBoard} handleSelectSquare={handleSelectSquare} />
      </div>
      <Log turns={gameTurns} />

      {(!!winnerName || isDraw) &&
        createPortal(<GameOver winner={winnerName} onClose={handleRestart} />, document.body)}
    </div>
  );
}

export default App;
