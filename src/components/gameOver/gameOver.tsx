import styles from "./styles.module.css";

type GameOverProps = {
  winner: string | null;
  onClose: () => void;
};

export const GameOver = ({ winner, onClose }: GameOverProps) => {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeButtonContainer}>
          <button className={styles.closeButton}>
            <span onClick={onClose}>×</span>
          </button>
        </div>
        {winner ? (
          <p className={styles.content}>The winner is {winner}!</p>
        ) : (
          <p className={styles.content}>Tie!</p>
        )}
        <button className={styles.newGameButton} onClick={onClose}>
          New Game
        </button>
      </div>
    </div>
  );
};
