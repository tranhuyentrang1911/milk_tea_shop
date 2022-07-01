import { handlePrice } from "assets/handleManyThings";
import svga from "assets/svg";
import React from "react";
import OrderProduct from "../OrderProduct";
import styles from "./productItem.module.scss";

const ProductItem = ({ item }) => {
  const handleOrderProduct = (id) => {
    const orderForm = document.querySelector(`#order-product-${id}`);
    orderForm.style.display = "flex";
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.img}>
          <img
            src={require(`../../../../assets/images/products/${item.img}`)}
            alt="error"
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.price}>{handlePrice(item.price)}</div>
        <button onClick={() => handleOrderProduct(item.id)}>
          {svga.cart}Đặt mua
        </button>
      </div>
      <OrderProduct
        key={item.id}
        id={item.id}
        img={item.img}
        categoryId={item.categoryId}
        name={item.name}
        price={item.price}
      />
    </div>
  );
};

export default ProductItem;
