import { GameBoard } from "./components/gameBoard/gameBoard.tsx";
import styles from "./styles.module.css";
import { useMemo, useState } from "react";
import { Log } from "./components/log/log.tsx";
import { Player } from "./components/player/player.tsx";
import { WINNING_COMBINATIONS } from "./constants/constants.ts";
import { Board, PlayerSymbols, SquareValue, Turns } from "./constants/types.ts";
import { Modal } from "./components/modal/modal.tsx";

const initialGameBoard: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns: Turns) {
  return gameTurns.length > 0 && gameTurns[0].player === PlayerSymbols.X
    ? PlayerSymbols.O
    : PlayerSymbols.X;
}

function App() {
  const [gameTurns, setGameTurns] = useState<Turns>([]);
  let gameBoard = [...initialGameBoard.map((row) => [...row])];
  let winner: SquareValue = null;

  const currentPlayer = deriveActivePlayer(gameTurns);

  for (const turn of gameTurns) {
    const {
      square: { row, col },
      player,
    } = turn;

    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setGameTurns((prevTurns) => {
      const activePlayer = deriveActivePlayer(prevTurns);

      return [{ square: { row: rowIndex, col: colIndex }, player: activePlayer }, ...prevTurns];
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  const isDraw = useMemo(() => {
    return gameTurns.length === 9 && !winner;
  }, [gameTurns, winner]);

  return (
    <div className={styles.appContainer}>
      {(!!winner || isDraw) && <Modal winner={winner} onClose={handleRestart} />}
      <h1>Tic Tac Toe</h1>
      <div className={styles.gameContainerStyles}>
        <ol className={styles.playersContainer}>
          <Player symbol={PlayerSymbols.X} isActive={currentPlayer === PlayerSymbols.X} />
          <Player symbol={PlayerSymbols.O} isActive={currentPlayer === PlayerSymbols.O} />
        </ol>
        <GameBoard turns={gameBoard} handleSelectSquare={handleSelectSquare} />
      </div>
      <Log turns={gameTurns} />
    </div>
  );
}

export default App;
