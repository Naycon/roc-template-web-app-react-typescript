// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import { Component, PropTypes } from 'react';

import { Navbar } from '../../components/navbar/index';
import { Footer } from '../../components/footer/index';

import * as styles from './style.scss';

/* HACK-ALERT! The following is needed to fool typescript into letting us access
 * the 'default' parameter of Helmet. This is rare case that occurs when 'modules'
 * is set to 'es2015' and target is set to 'es2015' when trying to use a module
 * that declares its exports with `export = someVar` in their type definition files.
 *
 * While the `"moduleResolution": "node"` option is needed (see the tsconfig file),
 * we cannot specify our own d.ts-files either, since they won't be resolved unless
 * they reside in a node_modules directory. So until that bug is fixed, we'll have
 * to live with this workaround here.
 */
import * as HelmetImports from 'react-helmet';
const _Helmet : any = HelmetImports;
const Helmet : any = _Helmet['default'];
/* END OF HACKS */

interface AppProps {
  children: Component<any, any>[];
}

export default class App extends Component<AppProps, void> {
  render() {
    return (
      <div className={styles.main}>
        <Helmet
          link={[{
            rel: 'icon', href: '/favicon.png',
          }]}
        />
        <Navbar />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}
