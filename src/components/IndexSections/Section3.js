import React from 'react';
import cn from 'classnames';

import styles from './Section3.module.scss';

function renderSection3(props) {
  return (
    <section className={styles.section3}>
      <div className={styles.flex_col6}>
        <h1 className={styles.title1}>How to use delivery service</h1>

        <div className={styles.flex_row9}>
          <div className={styles.flex_col7}>
            <img
              className={styles.image6}
              src={require('assets/125dfabb6373bf63a5a9bdf9afa98cfa.png')}
              alt="alt text"
            />
            <h2 className={styles.medium_title4}>choose your coffee</h2>
            <h4 className={styles.highlight22}>there are 20+ coffees for you</h4>
          </div>

          <div className={styles.flex_row9__spacer} />

          <div className={styles.flex_col8}>
            <img
              className={styles.image61}
              src={require('assets/43c4b93d2fb00931e3df4ea85ce46316.png')}
              alt="alt text"
            />
            <h2 className={styles.medium_title5}>we delivery it to you</h2>
            <h4 className={styles.highlight5}>Choose delivery service</h4>
          </div>

          <div className={styles.flex_row9__spacer1} />

          <div className={styles.flex_col9}>
            <img
              className={styles.image62}
              src={require('assets/45fa84b4c00b2ee863b6d82d68acf406.png')}
              alt="alt text"
            />
            <h2 className={styles.medium_title6}>Enjoy your coffee</h2>
            <h4 className={styles.highlight51}>Choose delivery service</h4>
          </div>
        </div>
      </div>
    </section>
  );
}

export default renderSection3;
