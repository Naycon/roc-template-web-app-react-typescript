import * as React from 'react';
import * as styles from './style.scss';

export const Footer = () => (
  <div className={styles.footer}>
    <div className="wrapper">
      <a href="http://github.com/rocjs/roc" alt="Github.com Roc" className={styles.container}><img src="/gh.png" className={styles.gh} /></a>
    </div>
  </div>
);
