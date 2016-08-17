import * as React from 'react';
import * as styles from './style.scss';

export const Footer = () => (
  <div className={styles.footer}>
    <div className="wrapper">
      <a href="http://tech.vg.no" alt="VG Tech" className={styles.vg}>VG</a>
      <a href="http://github.com/rocjs/roc" alt="Github.com Roc" className={styles.gh}>Roc at github.com</a>
    </div>
  </div>
);

