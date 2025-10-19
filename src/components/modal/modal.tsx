import type { PropsWithChildren } from "react";
import styles from "./styles.module.css";

type ModalProps = PropsWithChildren<{
  actionButtonLabel: string;
  onClose: () => void;
}>;

export const Modal = ({ onClose, actionButtonLabel, children }: ModalProps) => {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeButtonContainer}>
          <button className={styles.closeButton} onClick={onClose}>
            <span>×</span>
          </button>
        </div>
        <div className={styles.content}>{children}</div>

        <button className={styles.actionButton} onClick={onClose}>
          {actionButtonLabel}
        </button>
      </div>
    </div>
  );
};
