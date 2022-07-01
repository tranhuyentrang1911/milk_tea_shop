import React, { useState, useEffect } from "react";
import styles from "./slider.module.scss";
import cx from "classnames";
import svga from "assets/svg";
import dataSlider from "assets/slider";

const Slider = () => {
  // const css = classNames.bind(styles);
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [slideIndex]);

  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else {
      setSlideIndex(1);
    }
  };
  const preSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else {
      setSlideIndex(dataSlider.length);
    }
  };
  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className={styles.container_slider}>
      {dataSlider.map((obj, index) => {
        return (
          <div
            key={obj.id}
            className={
              slideIndex === index + 1
                ? cx(styles.slide, styles.active_anim)
                : styles.slide
            }
          >
            <img
              src={require(`../../../../assets/images/banner/${obj.path}`)}
              alt=""
            />
          </div>
        );
      })}
      <div className={cx(styles.btn_slide, styles.pre)} onClick={preSlide}>
        {svga.pre}
      </div>
      <div
        className={cx(styles.btn_slide, styles.next)}
        id="next"
        onClick={nextSlide}
      >
        {svga.next}
      </div>
      <div className={styles.container_dots}>
        {dataSlider.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                moveDot(index + 1);
              }}
              className={
                slideIndex === index + 1
                  ? cx(styles.dot, styles.active)
                  : styles.dot
              }
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
