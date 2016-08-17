import * as React from 'react';
import { IndexLink, Link } from 'react-router';
import * as styles from './style.scss';

export const Navbar = () => (
  <div className={styles.navbar}>
    <div className="wrapper">
      <ul>
        <li>
          <IndexLink
            to="/"
            className={styles.a}
            activeClassName={styles.active}
          >
          Home
        </IndexLink>
        </li>
        <li>
          <Link
            to="/about/"
            className={styles.a}
            activeClassName={styles.active}
          >
            About
          </Link>
        </li>
      </ul>
    </div>
  </div>
);
