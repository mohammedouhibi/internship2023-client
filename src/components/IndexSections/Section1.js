import React from 'react';
import cn from 'classnames';

import styles from './Section1.module.scss';

function renderSection1(props) {
  return (
    <section className={styles.section1}>
      <img className={styles.decorator} src={require('./assets/logo-coffe.png')} alt="alt text" />

      <div className={styles.flex_col1}>
        <div className={styles.flex_row}>
          <div className={styles.flex_row__cell}>
            <img
              className={styles.image1}
              src={require('assets/dca4a9ddc7a0e1f3651577eeb19794ca.png')}
              alt="alt text"
            />
          </div>
          <div className={styles.flex_row__spacer} />
          <h4 className={styles.highlight1}>About us</h4>
          <div className={styles.flex_row__spacer1} />
          <h4 className={styles.highlight2}>Our Product</h4>
          <div className={styles.flex_row__spacer1} />
          <h4 className={styles.highlight21}>Delivery</h4>
          <div className={styles.flex_row__spacer2} />

          <div className={styles.box1}>
            <div className={styles.flex_row1}>
              <img
                className={styles.icon2}
                src={require('assets/413a185859227f078c723f1a18d37219.png')}
                alt="alt text"
              />
              <div className={styles.info1}>Cappuccino </div>
            </div>
          </div>

          <div className={styles.flex_row__spacer3} />
          <img className={styles.icon1} src={require('assets/1683de15ea1017d72e471975ed59a7b7.png')} alt="alt text" />
        </div>

        <div className={styles.flex_row2}>
          <div className={styles.flex_row2__cell}>
            <div className={styles.flex_col2}>
              <h1 className={styles.hero_title_box}>
                <span className={styles.hero_title}>
                  <span className={styles.hero_title_span0}>Enjoy your </span>
                  <span className={styles.hero_title_span1}>coffee </span>
                  <span className={styles.hero_title_span2}>before your activity</span>
                </span>
              </h1>
              <h4 className={styles.highlight}>
                Boost your productivity and build your mood with a glass of coffee in the morning{' '}
              </h4>

              <div className={styles.flex_row3}>
                <div className={styles.box}>
                  <div className={styles.flex_row4}>
                    <div className={styles.text}>Order now</div>
                    <img
                      className={styles.icon}
                      src={require('assets/4fefb1a80a129368d43f4dd298b32a2e.png')}
                      alt="alt text"
                    />
                  </div>
                </div>

                <div className={styles.flex_row3__spacer} />
                <div className={styles.info}>More menu</div>
              </div>
            </div>
          </div>
          <div className={styles.flex_row2__spacer} />
          <div className={styles.flex_row2__cell1}>
            <img className={styles.image} src={require('assets/ac9a935b3a335947563b6c4933679582.png')} alt="alt text" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default renderSection1;
