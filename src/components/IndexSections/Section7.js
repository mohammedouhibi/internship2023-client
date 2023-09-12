import React from 'react';
import cn from 'classnames';

import styles from './Section7.module.scss';

function renderSection7(props) {
  return (
    <section className={styles.section7}>
      <div
        className={styles.section71}
        style={{ '--src': `url(${require('assets/afe1fdb28a4e88ed7dbfd67ee014008f.png')})` }}>
        <div className={styles.flex_col14}>
          <h1 className={styles.title11}>Subscribe to get 50% discount price</h1>

          <div className={styles.content_box13}>
            <div className={styles.flex_row13}>
              <h5 className={styles.highlight71}>Email address</h5>
              <div className={styles.flex_row13__spacer} />

              <div className={styles.box11}>
                <div className={styles.text2}>Order now</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default renderSection7;
