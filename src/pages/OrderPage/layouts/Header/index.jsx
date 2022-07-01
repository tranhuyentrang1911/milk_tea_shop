import cx from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import svga from "assets/svg";
import { orderItemSelector } from "redux/selectors";
import filtersSlice from "redux/slices/filtersSlice";
import { fetchOrderItem } from "redux/slices/orderSlice";

import styles from "./header.module.scss";

const Header = () => {
  const [nameFilter, setNameFilter] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = Number(JSON.parse(localStorage.getItem("user")).user.id);
  const userName = JSON.parse(localStorage.getItem("user")).user.name;
  const orderList = useSelector(orderItemSelector);

  const handleSearch = () => {
    dispatch(filtersSlice.actions.nameFilterChange(nameFilter));
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      setNameFilter("");
    }
  };

  useEffect(() => {
    dispatch(fetchOrderItem(userId));
  }, []);

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img
            src={require("../../../../assets/images/logo/logo_2.png")}
            alt=""
          />
        </div>
        <div className={styles.search}>
          <span onClick={handleSearch}> {svga.search}</span>
          <input
            type="text"
            placeholder="Bạn muốn mua gì..."
            value={nameFilter}
            onKeyDown={handleEnter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.email}>
          {svga.email}
          <div className={cx(styles.email_action, styles.active)}>
            <h3>Đơn hàng của bạn</h3>
            {orderList.map((item) => (
              <div key={item.id} className={styles.order_item}>
                <p>haha</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.user}>
          {svga.user}
          <div className={cx(styles.user_action, styles.active)}>
            <div className={styles.top}>
              {svga.user}
              <p>{userName}</p>
            </div>
            <div className={styles.bottom}>
              <button>Đổi mật khẩu</button>
              <button onClick={logOut}>Đăng xuất</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
