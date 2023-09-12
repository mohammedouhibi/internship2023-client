import React from 'react';
import cn from 'classnames';

import renderSection1 from './Section1.js';
import renderSection2 from './Section2.js';
import renderSection3 from './Section3.js';
import renderSection4 from './Section4.js';
import renderSection5 from './Section5.js';
import renderSection6 from './Section6.js';
import renderSection7 from './Section7.js';

import styles from './Index.module.scss';

function Index(props) {
  return (
    <div className={cn(styles.root, 'index')}>
      <div className={styles.flex_col}>
        <div className={styles.group1}>{renderSection1(props)}</div>

        <div className={styles.flex_col__cell}>{renderSection2(props)}</div>
        <div className={styles.flex_col__cell}>{renderSection3(props)}</div>
        <div className={styles.flex_col__cell}>{renderSection4(props)}</div>
        <div className={styles.flex_col__cell}>{renderSection5(props)}</div>
        <div className={styles.flex_col__cell}>{renderSection6(props)}</div>
        <div className={styles.flex_col__cell}>{renderSection7(props)}</div>
      </div>
    </div>
  );
}

export default Index;
