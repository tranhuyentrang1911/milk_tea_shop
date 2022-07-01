import { Modal } from "antd";
import React, { useState } from "react";

import { handlePrice } from "assets/handleManyThings";

import styles from "../productList.module.scss";

const ProductItem = (props) => {
  const { id, name, img, price } = props;

  const handleOnclick = () => {
    const orderForm = document.querySelector(`#order-product-${id}`);
    orderForm.style.display = "flex";
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const form = document.querySelector("#formSignIn");
    form.style.display = "flex";
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className={styles.main_item}>
        <div className={styles.img}>
          <img
            alt="error"
            src={require(`../../../../../assets/images/products/${img}`)}
          />
        </div>
        <p className={styles.name}>{name}</p>
        <p className={styles.price}>{handlePrice(price)}</p>
        <button onClick={showModal}>Đặt hàng</button>
      </div>
      <Modal
        className={styles.modal}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Hãy đăng nhập để có có trải nghiệm tốt nhất</p>
      </Modal>
    </>
  );
};

export default ProductItem;
