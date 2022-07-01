import svga from "assets/svg";
import { useEffect, useState } from "react";
import styles from "./scrollTop.module.scss";

function ScrollTop() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  useEffect(() => scrollToTop(), []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div
      onClick={scrollToTop}
      className={styles.scrollTop}
      style={{ display: visible ? "inline" : "none" }}
    >
      {svga.up}
    </div>
  );
}

export default ScrollTop;
