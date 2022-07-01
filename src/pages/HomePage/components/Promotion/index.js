import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { scrollToTop } from "assets/handleManyThings";
import svga from "assets/svg";
import { promotionListSelector, promotionsPagination } from "redux/selectors";
import { fetchPromotions } from "redux/slices/promotionSlice";

import styles from "./promotion.module.scss";

const Promotion = () => {
  const dispatch = useDispatch();
  const [pageCurrent, setPageCurrent] = useState(1);
  const { _page, _limit, _totalRows } = useSelector(promotionsPagination);
  const totalPages = Math.ceil(_totalRows / _limit);
  const totalPagesArray = [];
  const promotionList = useSelector(promotionListSelector);

  for (let i = 1; i <= totalPages; i++) {
    totalPagesArray.push(i);
  }
  const handleSetPageCurrent = (newPage) => {
    if (newPage) {
      setPageCurrent(newPage);
    }
  };
  useEffect(() => {
    scrollToTop();
  }, []);
  useEffect(() => {
    dispatch(
      fetchPromotions({
        page: pageCurrent,
        limit: 8,
      })
    );
  }, [pageCurrent]);

  return (
    <>
      <div style={{ marginTop: "112px" }}></div>
      <div className={styles.banner}></div>
      <div className={styles.container}>
        <div className={styles.main}>
          {promotionList.map((item) => (
            <div key={item.id} className={styles.main_item}>
              <div className={styles.img}>
                <img
                  src={require(`assets/images/post/${item.img}`)}
                  alt="Error img"
                />
                <div className={styles.day}>
                  {item.start} - {item.end}
                </div>
                <div className={styles.title}>{item.title}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          <div className={styles.button}>
            <button
              disabled={_page <= 1}
              onClick={() => handleSetPageCurrent(_page - 1)}
            >
              {svga.pre}
            </button>
          </div>
          {totalPagesArray.map((item, index) => (
            <div className={styles.button} key={item}>
              <button
                className={_page === item ? styles.active : null}
                onClick={() => handleSetPageCurrent(item)}
              >
                {item}
              </button>
            </div>
          ))}
          <div className={styles.button}>
            <button
              disabled={_page >= totalPages}
              onClick={() => handleSetPageCurrent(_page + 1)}
            >
              {svga.next}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Promotion;
