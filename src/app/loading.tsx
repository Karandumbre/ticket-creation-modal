import React from 'react';
import styles from './task-editor/style.module.css';
export default function loading() {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'>
      <div className={styles['spinner']}></div>
    </div>
  );
}
