import cx from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { handlePrice } from "assets/handleManyThings";
import svga from "assets/svg";
import { addProductToCart } from "redux/slices/cartSlice";

import styles from "../../common/order.module.scss";

const OrderProduct = ({ id, name, img, categoryId, price }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  const [size, setSize] = useState("M");
  const [sugar, setSugar] = useState("Bình thường");
  const [ice, setIce] = useState("Bình thường");
  const [note, setNote] = useState("");
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("user")).user.id;

  const handleCloseOnclick = () => {
    const orderForm = document.querySelector(`#order-product-${id}`);
    orderForm.style.display = "none";
  };
  const handleMinusQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddProductToCartType1 = () => {
    const newTodo = {
      name: name,
      categoryId: categoryId,
      userId: userId,
      size: size,
      sugar: sugar,
      ice: ice,
      img: img,
      note: note,
      quantity: quantity,
      price: price,
    };

    dispatch(addProductToCart(newTodo));
  };
  const handleAddProductToCart = () => {
    const newTodo = {
      name: name,
      categoryId: categoryId,
      userId: userId,
      size: "",
      sugar: "",
      ice: "",
      img: img,
      note: note,
      quantity: quantity,
      price: price,
    };

    dispatch(addProductToCart(newTodo));
  };

  useEffect(() => {
    setTotalPrice((pre) => (pre = price));
    if (size === "L") {
      setTotalPrice((pre) => pre + 5000);
    } else if (size === "XL") {
      setTotalPrice((pre) => pre + 10000);
    }

    setTotalPrice((pre) => pre * quantity);
  }, [size, quantity, price]);

  if (categoryId === 1) {
    return (
      <div
        className={styles.modal}
        id={`order-product-${id}`}
        onClick={handleCloseOnclick}
      >
        <div className={styles.main} onClick={(e) => e.stopPropagation()}>
          <div className={styles.close}>
            <button onClick={handleCloseOnclick}>{svga.close}</button>
          </div>
          <div className={styles.left}>
            <img alt="error" src={require(`assets/images/products/${img}`)} />
          </div>
          <div className={styles.right}>
            <div className={styles.name}>{name}</div>
            <div className={styles.price}>{handlePrice(price)}</div>
            <div className={styles.quantity}>
              <button onClick={handleMinusQuantity}>{svga.minus}</button>
              <span>{quantity}</span>
              <button onClick={handleAddQuantity}>{svga.plus}</button>
            </div>
            <p>Chọn kích cỡ</p>
            <div className={styles.size}>
              <div
                className={cx(styles.size_item, {
                  [styles.active]: size === "M",
                })}
                onClick={() => {
                  setSize("M");
                }}
              >
                <p className={styles.size_main}>M</p>
                <p className={styles.size_price}>0 đ</p>
              </div>
              <div
                className={cx(styles.size_item, {
                  [styles.active]: size === "L",
                })}
                onClick={() => {
                  setSize("L");
                }}
              >
                <p className={styles.size_main}>L</p>
                <p className={styles.size_price}>+5000 đ</p>
              </div>
              <div
                className={cx(styles.size_item, {
                  [styles.active]: size === "XL",
                })}
                onClick={() => {
                  setSize("XL");
                }}
              >
                <p className={styles.size_main}>XL</p>
                <p className={styles.size_price}>+10000 đ</p>
              </div>
            </div>
            <p>Đường</p>
            <div className={styles.status}>
              <div
                className={cx(styles.status_item, {
                  [styles.active]: sugar === "Ít",
                })}
                onClick={() => {
                  setSugar("Ít");
                }}
              >
                Ít{" "}
              </div>
              <div
                className={cx(styles.status_item, {
                  [styles.active]: sugar === "Bình thường",
                })}
                onClick={() => {
                  setSugar("Bình thường");
                }}
              >
                Bình thường
              </div>
              <div
                className={cx(styles.status_item, {
                  [styles.active]: sugar === "Nhiều",
                })}
                onClick={() => {
                  setSugar("Nhiều");
                }}
              >
                Nhiều
              </div>
            </div>
            <p>Đá</p>
            <div className={styles.status}>
              <div
                className={cx(styles.status_item, {
                  [styles.active]: ice === "Ít",
                })}
                onClick={() => {
                  setIce("Ít");
                }}
              >
                Ít{" "}
              </div>
              <div
                className={cx(styles.status_item, {
                  [styles.active]: ice === "Bình thường",
                })}
                onClick={() => {
                  setIce("Bình thường");
                }}
              >
                Bình thường
              </div>

              <div
                className={cx(styles.status_item, {
                  [styles.active]: ice === "Nhiều",
                })}
                onClick={() => {
                  setIce("Nhiều");
                }}
              >
                Nhiều
              </div>
            </div>
            <p>Ghi chú</p>
            <textarea
              className={styles.note}
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className={styles.bottom}>
            <button
              onClick={() => {
                handleAddProductToCartType1();
                setTimeout(() => {
                  handleCloseOnclick();
                }, 500);
              }}
            >
              Thêm vào giỏ hàng: {handlePrice(totalPrice)}
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={styles.modal}
        id={`order-product-${id}`}
        onClick={handleCloseOnclick}
      >
        <div
          className={cx(styles.main, styles.type2)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.close}>
            <button onClick={handleCloseOnclick}>{svga.close}</button>
          </div>
          <div className={styles.left}>
            <img alt="error" src={require(`assets/images/products/${img}`)} />
          </div>
          <div className={styles.right}>
            <div className={styles.name}>{name}</div>
            <div className={styles.price}>{handlePrice(price)}</div>
            <div className={styles.quantity}>
              <button onClick={handleMinusQuantity}>{svga.minus}</button>
              <span>{quantity}</span>
              <button onClick={handleAddQuantity}>{svga.plus}</button>
            </div>

            <p>Ghi chú</p>
            <textarea
              className={cx(styles.note, styles.type2)}
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <div className={styles.bottom}>
            <button
              onClick={() => {
                handleAddProductToCart();
                setTimeout(() => {
                  handleCloseOnclick();
                }, 500);
              }}
            >
              Thêm vào giỏ hàng: {handlePrice(totalPrice)}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default OrderProduct;
