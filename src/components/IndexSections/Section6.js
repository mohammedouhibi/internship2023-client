import React from 'react';
import cn from 'classnames';

import styles from './Section6.module.scss';

function renderSection6(props) {
  return (
    <section className={styles.section6}>
      <div className={styles.group2}>
        <img className={styles.cover2} src={require('assets/34a4a8424932f4261880720b1a204295.png')} alt="alt text" />

        <div className={styles.flex_row12}>
          <div className={styles.flex_col12}>
            <h1 className={styles.title1}>What they say about us</h1>
            <h4 className={styles.highlight7}>
              We always provide the best service and always maintain the quality of coffee
            </h4>
          </div>

          <div className={styles.flex_row12__spacer} />

          <div className={styles.group3}>
            <img
              className={styles.image7}
              src={require('assets/e9d874ee61ee731aafc7ec39f6c05ff4.png')}
              alt="alt text"
            />

            <div className={styles.box10}>
              <div className={styles.flex_col13}>
                <h4 className={styles.highlight61}>Naura</h4>
                <p className={styles.paragraph1}>I really love the cappucino, the coffee was very smooth  </p>
              </div>
            </div>
          </div>

          <div className={styles.flex_row12__spacer1} />
        </div>
      </div>
    </section>
  );
}

export default renderSection6;
