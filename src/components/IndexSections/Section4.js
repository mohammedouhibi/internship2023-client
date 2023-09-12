import React from 'react';
import cn from 'classnames';

import styles from './Section4.module.scss';

function renderSection4(props) {
  return (
    <section className={styles.section4}>
      <div className={styles.group}>
        <img
          className={styles.decorator1}
          src={require('assets/766aee33d6ef63614f6cf6e62ece8dbc.png')}
          alt="alt text"
        />

        <div className={styles.flex_row10}>
          <div className={styles.flex_row10__cell}>
            <img
              className={styles.image4}
              src={require('assets/3c4e36d9270951115a0ab6db3f6d8036.png')}
              alt="alt text"
            />
          </div>
          <div className={styles.flex_row10__spacer} />

          <div className={styles.flex_col10}>
            <h1 className={styles.title}>About us</h1>
            <h2 className={styles.medium_title21}>We provide quality coffee, and ready to deliver.</h2>
            <h4 className={styles.highlight6}>
              We are a company that makes and distributes delicious drinks. our main product is made with a secret
              recipe and available in stores worldwide.
            </h4>

            <div className={styles.box8}>
              <div className={styles.info2}>Get your coffee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default renderSection4;
