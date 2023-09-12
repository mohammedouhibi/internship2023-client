import React from 'react';
import cn from 'classnames';

import styles from './Section5.module.scss';

function renderSection5(props) {
  return (
    <section className={styles.section5}>
      <div className={styles.flex_col11}>
        <h1 className={styles.title2}>Special menu for you</h1>

        <div
          className={styles.box9}
          style={{ '--src': `url(${require('assets/a3af4295d1f2fc54f764cf0bf3c2024a.png')})` }}>
          <div className={styles.content_box12}>
            <div className={styles.flex_col4}>
              <div
                className={styles.content_box11}
                style={{ '--src': `url(${require('assets/bce654a56f41359d49af298d70cf80d9.png')})` }}>
                <div
                  className={styles.content_box42}
                  style={{ '--src': `url(${require('assets/77c587ed9aba5763219b8b218120040c.png')})` }}>
                  <div className={styles.box71}>
                    <div className={styles.flex_row6}>
                      <div className={styles.text1}>4.8</div>
                      <div className={styles.flex_row6__cell3}>
                        <img
                          className={styles.icon5}
                          src={require('assets/69cf9e039dda333b763d1da4021de803.png')}
                          alt="alt text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.flex_row7}>
                <h2 className={styles.medium_title7}>Sandwich</h2>
                <div className={styles.flex_row7__spacer3} />
                <h2 className={styles.medium_title1}>12 K</h2>
              </div>

              <div className={styles.flex_row11}>
                <p className={styles.paragraph}>bread with meat and vegetables</p>
                <div className={styles.flex_row11__spacer} />
                <img
                  className={styles.icon31}
                  src={require('assets/c784b89b47c86df4a6522276ea94cacf.png')}
                  alt="alt text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default renderSection5;
