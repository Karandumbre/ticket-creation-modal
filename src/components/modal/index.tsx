import React from 'react';
import styles from './style.module.css'; // Import the CSS module
import Link from 'next/link';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  goBackPath: string;
}

export const Modal = ({ isOpen, children, goBackPath }: ModalProps) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <Link href={goBackPath || ''}>
          <button className={styles.closeButton}>&times;</button>
        </Link>
        {children}
      </div>
    </div>
  );
};
